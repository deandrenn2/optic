using Carter;
using DocumentFormat.OpenXml.ExtendedProperties;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Report;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.Formulas;

public class GenerateReportFormulaInvoice : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/formulas/{id:int}/report/invoice", async (int id, IMediator mediator, string templateName = "") =>
        {
            return await mediator.Send(new GenerateReportCommand(id, templateName));
        })
        .WithName(nameof(GenerateReportFormulaInvoice))
        .WithTags(nameof(Formula))
        .Produces(StatusCodes.Status200OK)
        .Produces<GenerateReportResponse>(StatusCodes.Status200OK);
    }

    public record GenerateReportCommand(int Id, string TemplateName) : IRequest<IResult>;

    public record GenerateReportResponse(byte[] Report);

    public record ReportDataQuery
    {
        public int Id { get; init; }
        public string CompanyName { get; init; } = string.Empty;
        public string Abbreviation { get; init; } = string.Empty;
        public string UrlLogo { get; init; } = string.Empty;
        public string Nit { get; init; } = string.Empty;
        public string Address { get; init; } = string.Empty;
        public string PhoneNumber { get; init; } = string.Empty;
        public string ClientName { get; init; } = string.Empty;
        public string ClientPhoneNumber { get; init; } = string.Empty;
        public string FormulaNumber { get; init; } = string.Empty;
        public string FormulaDate { get; init; } = string.Empty;
        public string FormulaDescription { get; init; } = string.Empty;
        public string GenerationDate { get; init; } = string.Empty;
        public decimal? PriceLens { get; init; }
        public decimal? PriceConsultation { get; init; }

        public decimal? PriceTotal
        {
            get
            {
                return PriceLens + PriceConsultation;
            }
        }

    }

    public class GetReportFormulaHandler(AppDbContext context, IClosedXmlReportManager reportManager) : IRequestHandler<GenerateReportCommand, IResult>
    {
        public async Task<IResult> Handle(GenerateReportCommand request, CancellationToken cancellationToken)
        {
            var formula = await context.Formulas
                                    .Include(x => x.Client)
                                    .Include(x => x.Invoice)
                                    .Include(x => x.Tags)
                                    .Include(x => x.FormulaDiagnosis).ThenInclude(x => x.Diagnosis)
                                    .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (formula == null)
            {
                return Results.Ok(Result.Failure(new Error("Formula.NotFound", "Formula no encontrada")));
            }

            var business = await context.Businesses.FirstOrDefaultAsync(x => x.Id == formula.BusinessId, cancellationToken);

            if (business == null)
            {
                return Results.Ok(Result.Failure(new Error("Business.NotFound", "Negocio no encontrado")));
            }

            var reportData = new ReportDataQuery
            {
                Id = formula.Id,
                CompanyName = business.CompanyName,
                Abbreviation = business.Abbreviation,
                UrlLogo = business.UrlLogo,
                Nit = business.Nit,
                Address = business.Address,
                PhoneNumber = business.PhoneNumber,
                ClientName = formula.Client.LastName + " " + formula.Client.FirstName,
                ClientPhoneNumber = formula.Client.PhoneNumber,
                FormulaNumber = formula.Invoice.Number.ToString("D5"),
                FormulaDate = formula.Invoice.Date.ToString("dd/MM/yyyy"),
                FormulaDescription = formula.Description ?? string.Empty,
                GenerationDate = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"),
                PriceLens = formula.PriceLens,
                PriceConsultation = formula.PriceConsultation
            };

            var resArray = reportManager.GenerateReportAsync("Formula_Invoice", reportData);
            var name = string.IsNullOrEmpty(request.TemplateName) ? $"formula_{DateTime.Now.Year}_{DateTime.Now.Month}_{DateTime.Now.Day}_{DateTime.Now.Second}.xlsx" : $"{request.TemplateName}_{DateTime.Now.Year}_{DateTime.Now.Month}_{DateTime.Now.Day}_{DateTime.Now.Second}.xlsx";

            return Results.File(resArray, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", name);
        }
    }

    public class GenerateReportFormulaValidator : AbstractValidator<GenerateReportCommand>
    {
        public GenerateReportFormulaValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
        }
    }
}