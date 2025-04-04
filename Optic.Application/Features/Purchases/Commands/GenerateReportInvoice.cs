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

namespace Optic.Application.Features.Purchases;

public class GenerateReportPurchase : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/purchases/{id:int}/report", async (int id, IMediator mediator, string templateName = "") =>
        {
            return await mediator.Send(new GenerateReportCommand(id, templateName));
        })
        .WithName(nameof(GenerateReportPurchase))
        .WithTags(nameof(Purchase))
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
        public string SupplierName { get; init; } = string.Empty;
        public string SupplierPhoneNumber { get; init; } = string.Empty;
        public string PurchaseNumber { get; init; } = string.Empty;
        public string PurchaseDate { get; init; } = string.Empty;
        public string GenerationDate { get; init; } = string.Empty;
        public List<PurchaseDetailModel> Details { get; init; } = new();
        public decimal TotalProducts { get { return Details.Sum(x => x.TotalCost); } }
    }

    public class GetReportpurchaseHandler(AppDbContext context, IClosedXmlReportManager reportManager) : IRequestHandler<GenerateReportCommand, IResult>
    {
        public async Task<IResult> Handle(GenerateReportCommand request, CancellationToken cancellationToken)
        {
            var purchase = await context.Purchases
                                    .Include(x => x.Supplier)
                                    .Include(x => x.PurchaseDetails)
                                    .ThenInclude(x => x.Product)
                                    .FirstOrDefaultAsync(x => x.Id == request.Id);

            if (purchase == null)
            {
                return Results.Ok(Result.Failure(new Error("Purchase.NotFound", "Compra no encontrada")));
            }

            var business = await context.Businesses.FirstOrDefaultAsync(x => x.Id == purchase.BusinessId);

            if (business == null)
            {
                return Results.Ok(Result.Failure(new Error("Business.NotFound", "Negocio no encontrado")));
            }

            var reportData = new ReportDataQuery
            {
                Id = purchase.Id,
                CompanyName = business.CompanyName,
                Abbreviation = business.Abbreviation,
                UrlLogo = business.UrlLogo,
                Nit = business.Nit,
                Address = business.Address,
                PhoneNumber = business.PhoneNumber,
                SupplierName = purchase.Supplier.Name,
                SupplierPhoneNumber = purchase.Supplier?.PhoneNumber ?? string.Empty,
                PurchaseNumber = purchase.Number.ToString("D5"),
                PurchaseDate = purchase.Date.ToString("dd/MM/yyyy"),
                GenerationDate = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"),
                Details = purchase.PurchaseDetails.Select(y => new PurchaseDetailModel
                {
                    Id = y.Id,
                    IdPurchase = y.IdPurchase,
                    IdProduct = y.IdProduct,
                    Description = y.Description,
                    Price = y.Price,
                    Quantity = y.Quantity,
                    ProductName = y.Product?.Name,
                }).ToList()
            };

            var resArray = reportManager.GenerateReportAsync("Purchase", reportData);
            var name = string.IsNullOrEmpty(request.TemplateName) ? $"Purchase_{DateTime.Now.Year}_{DateTime.Now.Month}_{DateTime.Now.Day}_{DateTime.Now.Second}.xlsx" : $"{request.TemplateName}_{DateTime.Now.Year}_{DateTime.Now.Month}_{DateTime.Now.Day}_{DateTime.Now.Second}.xlsx";

            return Results.File(resArray, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", name);
        }
    }

    public class GenerateReportPurchaseValidator : AbstractValidator<GenerateReportCommand>
    {
        public GenerateReportPurchaseValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
        }
    }
}