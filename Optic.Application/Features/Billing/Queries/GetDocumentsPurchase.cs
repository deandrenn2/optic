using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

public class GetDocumentsPurchase : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/billing/documents/purchases", async (IMediator mediator,
        int pageSize,
        int pageIndex,
        int? Number,
        string? Status,
        string? TypeDocument,
        int? ClientId,
        int? SupplierId,
        DateTime? Desde,
        DateTime? Hasta) =>
        {
            return await mediator.Send(new GetDocumentsQuery(pageSize, pageIndex, Number, Status, TypeDocument, ClientId, SupplierId, Desde, Hasta));
        })
        .WithName(nameof(GetDocumentsPurchase))
        .WithTags("Billing")
        .Produces<List<GetDocumentsResponse>>(StatusCodes.Status200OK);
    }

    public record GetDocumentsResponse(
        int Id,
        int Number,
        string TypeDocument,
        string State,
        string ClientOrSupplier,
        DateTime Date,
        string PaymentMethod,
        decimal Total
    );

    public record GetDocumentsQuery(
        int PageSize,
        int PageIndex,
        int? Number,
        string? Status,
        string? TypeDocument,
        int? ClientId,
        int? SupplierId,
        DateTime? Desde,
        DateTime? Hasta) : IRequest<IResult>;

    public class GetDocumentsHandler(AppDbContext context) : IRequestHandler<GetDocumentsQuery, IResult>
    {
        public async Task<IResult> Handle(GetDocumentsQuery request, CancellationToken cancellationToken)
        {
            var purchasesQuery = context.Purchases.Include(x => x.Supplier).AsQueryable();


            //Purchases query

            if (request.Number != null)
            {
                purchasesQuery = purchasesQuery.Where(x => x.Number == request.Number);
            }

            if (request.Status != null)
            {
                purchasesQuery = purchasesQuery.Where(x => x.State == request.Status);
            }

            if (request.TypeDocument != null)
            {
                purchasesQuery = purchasesQuery.Where(x => x.PaymentType == request.TypeDocument);
            }

            if (request.SupplierId != null)
            {
                purchasesQuery = purchasesQuery.Where(x => x.SupplierId == request.SupplierId);
            }

            purchasesQuery = purchasesQuery.Where(x => x.PaymentType == "Crédito" && x.State != "Pagada");

            purchasesQuery = purchasesQuery.OrderByDescending(x => (double)x.Total);


            var purchaseQueryModel = purchasesQuery.Select(x => new GetDocumentsResponse(
                 x.Id,
                 x.Number,
                 "Compra",
                 x.State,
                 x.Supplier.Name,
                 x.Date,
                 x.PaymentType,
                 x.Total
             ));

            var documents = await purchaseQueryModel.GetPagedAsync(request.PageIndex, request.PageSize);


            return Results.Ok(documents);
        }
    }

}