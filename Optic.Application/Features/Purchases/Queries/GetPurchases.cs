using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.Purchases;
public class GetPurchases : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/purchases", async (IMediator mediator) =>
        {
            return await mediator.Send(new GetPurchasesQuery());
        })
        .WithName(nameof(GetPurchases))
        .WithTags(nameof(Purchase))
        .ProducesValidationProblem()
        .Produces(StatusCodes.Status200OK);
    }

    public record GetPurchasesQuery : IRequest<IResult>;

    public record PurchaseResponse
    {
        public int Id { get; init; }
        public int IdBusiness { get; init; }
        public int? SupplierId { get; init; }
        public string? SupplierName { get; init; } = string.Empty;
        public DateTime Date { get; init; } = DateTime.Now;
        public decimal? PriceLens { get; init; }
        public int Number { get; init; }
        public string State { get; init; } = string.Empty;
        public decimal? PriceConsultation { get; init; }

        public decimal? SumTotal
        {
            get
            {
                return PriceLens + PriceConsultation;
            }
        }
    }


    public class GetPurchasesHandler(AppDbContext context) : IRequestHandler<GetPurchasesQuery, IResult>
    {
        public async Task<IResult> Handle(GetPurchasesQuery request, CancellationToken cancellationToken)
        {
            var purchases = await context.Purchases.Include(x => x.Supplier).ToListAsync();

            var formulasList = purchases.Select(x => new PurchaseResponse
            {
                Id = x.Id,
                IdBusiness = x.BusinessId,
                SupplierId = x.SupplierId,
                SupplierName = x.Supplier.Name,
                Date = x.Date,
                State = x.State,
                Number = x.Number,
            }).ToList();

            if (purchases == null || purchases.Count == 0)
            {
                return Results.Ok(Result.Success("No hay compras registradas"));
            }

            return Results.Ok(Result<List<PurchaseResponse>>.Success(formulasList, "Compras obtenidas correctamente"));

        }
    }
}