using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

public class GetDocuments : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/billing/documents", async (IMediator mediator, int? Number,
        string? Status,
        string? TypeDocument,
        int? ClientId,
        int? SupplierId,
        DateTime? Desde,
        DateTime? Hasta) =>
        {
            return await mediator.Send(new GetDocumentsQuery(Number, Status, TypeDocument, ClientId, SupplierId, Desde, Hasta));
        })
        .WithName(nameof(GetDocuments))
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
            var invoicesQuery = context.Invoices.Include(x => x.Client).AsQueryable();


            //Invoices query

            if (request.Number != null)
            {
                invoicesQuery = invoicesQuery.Where(x => x.Number == request.Number);
            }

            if (request.Status != null)
            {
                invoicesQuery = invoicesQuery.Where(x => x.State == request.Status);
            }

            if (request.TypeDocument != null)
            {
                invoicesQuery = invoicesQuery.Where(x => x.PaymentType == request.TypeDocument);
            }

            if (request.ClientId != null)
            {
                invoicesQuery = invoicesQuery.Where(x => x.ClientId == request.ClientId);
            }


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

            var documents = new List<GetDocumentsResponse>();

            var dataInvoices = await invoicesQuery.ToListAsync();

            var dataPurchases = await purchasesQuery.ToListAsync();

            foreach (var invoice in dataInvoices)
            {
                documents.Add(new GetDocumentsResponse(
                    invoice.Id,
                    invoice.Number,
                    invoice.DocumentType,
                    invoice.State,
                    invoice.Client != null ? invoice.Client.LastName + " " + invoice.Client.FirstName : string.Empty,
                    invoice.Date,
                    invoice.PaymentType,
                    invoice.Total
                ));
            }

            foreach (var purchase in dataPurchases)
            {
                documents.Add(new GetDocumentsResponse(
                    purchase.Id,
                    purchase.Number,
                    "Compra",
                    purchase.State,
                    purchase.Supplier.Name,
                    purchase.Date,
                       purchase.PaymentType,
                    purchase.Total
                ));
            }

            return Results.Ok(Result<List<GetDocumentsResponse>>.Success(documents, "Datos de los documentos"));
        }
    }

}