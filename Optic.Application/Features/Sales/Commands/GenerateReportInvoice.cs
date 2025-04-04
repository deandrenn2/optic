using Carter;
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

namespace Optic.Application.Features.Sales;

public class GenerateReportInvoice : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/invoices/{id:int}/report", async (int id, IMediator mediator, string templateName = "") =>
        {
            return await mediator.Send(new GenerateReportCommand(id, templateName));
        })
        .WithName(nameof(GenerateReportInvoice))
        .WithTags(nameof(Invoice))
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
        public string InvoiceNumber { get; init; } = string.Empty;
        public string InvoiceDate { get; init; } = string.Empty;
        public string GenerationDate { get; init; } = string.Empty;
        public List<InvoiceDetailModel> Details { get; init; } = new();
        public decimal TotalProducts { get { return Details.Sum(x => x.TotalCost); } }
    }

    public class GetReportInvoiceHandler(AppDbContext context, IClosedXmlReportManager reportManager) : IRequestHandler<GenerateReportCommand, IResult>
    {
        public async Task<IResult> Handle(GenerateReportCommand request, CancellationToken cancellationToken)
        {
            var invoice = await context.Invoices
                                    .Include(x => x.Client)
                                    .Include(x => x.InvoiceDetails)
                                    .ThenInclude(x => x.Product)
                                    .FirstOrDefaultAsync(x => x.Id == request.Id);

            if (invoice == null)
            {
                return Results.Ok(Result.Failure(new Error("Invoice.NotFound", "Invoice no encontrada")));
            }

            var business = await context.Businesses.FirstOrDefaultAsync(x => x.Id == invoice.BusinessId);

            if (business == null)
            {
                return Results.Ok(Result.Failure(new Error("Business.NotFound", "Negocio no encontrado")));
            }

            var reportData = new ReportDataQuery
            {
                Id = invoice.Id,
                CompanyName = business.CompanyName,
                Abbreviation = business.Abbreviation,
                UrlLogo = business.UrlLogo,
                Nit = business.Nit,
                Address = business.Address,
                PhoneNumber = business.PhoneNumber,
                ClientName = invoice.Client.LastName + " " + invoice.Client.FirstName,
                ClientPhoneNumber = invoice.Client.PhoneNumber,
                InvoiceNumber = invoice.Number.ToString("D5"),
                InvoiceDate = invoice.Date.ToString("dd/MM/yyyy"),
                GenerationDate = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"),
                Details = invoice.InvoiceDetails.Select(y => new InvoiceDetailModel
                {
                    Id = y.Id,
                    IdInvoice = y.IdInvoice,
                    IdProduct = y.IdProduct,
                    Description = y.Description,
                    Price = y.Price,
                    Quantity = y.Quantity,
                    ProductName = y.Product?.Name,
                }).ToList()
            };

            var resArray = reportManager.GenerateReportAsync("invoice", reportData);
            var name = string.IsNullOrEmpty(request.TemplateName) ? $"Invoice_{DateTime.Now.Year}_{DateTime.Now.Month}_{DateTime.Now.Day}_{DateTime.Now.Second}.xlsx" : $"{request.TemplateName}_{DateTime.Now.Year}_{DateTime.Now.Month}_{DateTime.Now.Day}_{DateTime.Now.Second}.xlsx";

            return Results.File(resArray, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", name);
        }
    }

    public class GenerateReportInvoiceValidator : AbstractValidator<GenerateReportCommand>
    {
        public GenerateReportInvoiceValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
        }
    }
}