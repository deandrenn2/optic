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

namespace Optic.Application.Features.Purchases;
public class GetPurchase : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/purchases/{id:int}", async (int id, IMediator mediator) =>
        {
            return await mediator.Send(new GetPurchaseQuery(id));
        })
        .WithName(nameof(GetPurchase))
        .WithTags(nameof(Purchase))
        .ProducesValidationProblem()
        .Produces<PurchaseResponse>(StatusCodes.Status200OK);

    }

    public record GetPurchaseQuery(int Id) : IRequest<IResult>;

    public record PurchaseResponse
    {
        public int IdBusiness { get; init; }
        public int? SupplierId { get; init; }
        public string SupplierName { get; init; } = string.Empty;
        public string Description { get; init; } = string.Empty;
        public string State { get; init; } = string.Empty;
        public DateTime Date { get; init; } = DateTime.Now;

        public List<string> Tags { get; init; } = new();

        public List<PurchaseDetailModel> Products { get; init; } = new();

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


    public class GetPurchaseHandler(AppDbContext context) : IRequestHandler<GetPurchaseQuery, IResult>
    {
        public async Task<IResult> Handle(GetPurchaseQuery request, CancellationToken cancellationToken)
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

            var purchaseResponse = new PurchaseResponse
            {
                IdBusiness = purchase.BusinessId,
                SupplierId = purchase.SupplierId,
                SupplierName = purchase.Supplier.Name,
                State = purchase.State,
                Date = purchase.Date,
                Products = purchase.PurchaseDetails.Select(y => new PurchaseDetailModel
                {
                    Id = y.Id,
                    IdPurchase = y.IdPurchase,
                    IdProduct = y.IdProduct,
                    Description = y.Description,
                    Price = y.Price,
                    Quantity = y.Quantity,
                    ProductName = y.Product.Name,
                }).ToList(),
            };

            return Results.Ok(Result<PurchaseResponse>.Success(purchaseResponse, "Compra obtenida correctamente"));
        }
    }
}