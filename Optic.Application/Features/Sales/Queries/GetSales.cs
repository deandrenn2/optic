using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.Sales;
public class GetSales : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/sales", async (HttpRequest req, IMediator mediator) =>
        {
            return await mediator.Send(new GetSalesQuery());
        })
        .WithName(nameof(GetSales))
        .WithTags(nameof(Invoice))
        .ProducesValidationProblem()
        .Produces<List<SaleResponse>>(StatusCodes.Status200OK);

    }

    public record GetSalesQuery : IRequest<IResult>;

    public record SaleResponse
    {
        public int Id { get; init; }
        public int IdBusiness { get; init; }
        public int? IdClient { get; init; }
        public string ClientName { get; init; } = string.Empty;
        public string State { get; init; } = string.Empty;
        public DateTime Date { get; init; } = DateTime.Now;

        public int IdInvoice { get; init; }
        public List<InvoiceDetailModel> Products { get; init; } = new();

        public decimal? PriceLens { get; init; }
        public decimal PriceConsultation { get; init; }

        public decimal? SumTotal
        {
            get
            {
                return PriceLens + PriceConsultation;
            }
        }
    }


    public class GetSalesHandler(AppDbContext context) : IRequestHandler<GetSalesQuery, IResult>
    {
        public async Task<IResult> Handle(GetSalesQuery request, CancellationToken cancellationToken)
        {
            var sales = await context.Invoices
            .Include(x => x.Client)
            .Include(x => x.InvoiceDetails).ThenInclude(x => x.Product)
            .Include(x => x.InvoicePayments)
            .ThenInclude(x => x.Invoice)
            .Include(x => x.InvoiceServices)
            .ThenInclude(x => x.Invoice)
            .Where(x => x.State == "Borrador")
            .ToListAsync();

            var salesResponse = new List<SaleResponse>();

            foreach (var sale in sales)
            {
                var saleResponse = new SaleResponse
                {
                    IdBusiness = sale.BusinessId,
                    IdClient = sale.ClientId,
                    ClientName = sale.Client.LastName + " " + sale.Client.FirstName,
                    IdInvoice = sale.Id,
                    State = sale.State,
                    Date = sale.Date,
                    Products = sale.InvoiceDetails.Select(y => new InvoiceDetailModel
                    {
                        Id = y.Id,
                        IdInvoice = y.IdInvoice,
                        IdProduct = y.IdProduct,
                        Description = y.Description,
                        Price = y.Price,
                        Quantity = y.Quantity,
                        ProductName = y.Product.Name,
                    }).ToList()
                };

                salesResponse.Add(saleResponse);
            }

            return Results.Ok(Result<List<SaleResponse>>.Success(salesResponse, "Sales obtenida correctamente"));
        }
    }
}