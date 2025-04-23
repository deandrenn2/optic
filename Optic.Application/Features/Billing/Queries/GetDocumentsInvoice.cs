using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

public class GetDocumentsInvoice : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/billing/documents/invoices", async (IMediator mediator,
         int pageSize,
         int pageIndex,
        int? Number,
        string? Status,
        string? TypeDocument,
        int? ClientId,
        DateTime? Desde,
        DateTime? Hasta) =>
        {
            return await mediator.Send(new GetDocumentsQuery(pageSize, pageIndex, Number, Status, TypeDocument, ClientId, Desde, Hasta));
        })
        .WithName(nameof(GetDocumentsInvoice))
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
        DateTime? Desde,
        DateTime? Hasta) : IRequest<IResult>;

    public class GetDocumentsInvoiceHandler(AppDbContext context) : IRequestHandler<GetDocumentsQuery, IResult>
    {
        public async Task<IResult> Handle(GetDocumentsQuery request, CancellationToken cancellationToken)
        {
            var invoicesQuery = context.Invoices.Include(x => x.Client).Include(x => x.Formula).AsQueryable();
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

            invoicesQuery = invoicesQuery.Where(x => x.State == "Crédito");

            invoicesQuery = invoicesQuery.OrderByDescending(x => (double)x.Total);


            var documentsQueryModel = invoicesQuery.Select(x => new GetDocumentsResponse(
                x.DocumentType == "Formula" ? x.Formula.Id : x.Id,
                x.Number,
                x.DocumentType,
                x.State,
                x.Client != null ? x.Client.LastName + " " + x.Client.FirstName : string.Empty,
                x.Date,
                x.PaymentType,
                x.Total
            ));

            var documents = await documentsQueryModel.GetPagedAsync(request.PageIndex, request.PageSize);

            return Results.Ok(documents);
        }
    }

}