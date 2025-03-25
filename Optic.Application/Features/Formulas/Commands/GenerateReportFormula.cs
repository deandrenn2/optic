using Carter;
using DocumentFormat.OpenXml.ExtendedProperties;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Report;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.Formulas;

public class GenerateReportFormula : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/formulas/{id:int}/report", async (int id, IMediator mediator, string templateName = "") =>
        {
            return await mediator.Send(new GenerateReportCommand(id, templateName));
        })
        .WithName(nameof(GenerateReportFormula))
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
        public string CellPhoneNumber { get; init; } = string.Empty;
        public string PhoneNumber { get; init; } = string.Empty;
        public decimal Total { get; init; } = 0;
        public decimal PriceConsultation { get; init; } = 0;
    }

    public class GetReportFormulaHandler(AppDbContext context, IClosedXmlReportManager reportManager) : IRequestHandler<GenerateReportCommand, IResult>
    {
        public async Task<IResult> Handle(GenerateReportCommand request, CancellationToken cancellationToken)
        {
            var formula = await context.Formulas.FirstOrDefaultAsync(x => x.Id == request.Id);

            if (formula == null)
            {
                return Results.Ok(Result.Failure(new Error("Formula.NotFound", "Formula no encontrada")));
            }

            var business = await context.Businesses.FirstOrDefaultAsync(x => x.Id == formula.BusinessId);

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
                CellPhoneNumber = business.CellPhoneNumber,
                PhoneNumber = business.PhoneNumber,
                PriceConsultation = formula.PriceConsultation
            };

            var resArray = reportManager.GenerateReportAsync("Invoice", reportData);
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