using Carter;
using FluentValidation;
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
public class GetSale : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/sales/{id:int}", async (int id, HttpRequest req, IMediator mediator) =>
        {
            return await mediator.Send(new GetSaleQuery(id));
        })
        .WithName(nameof(GetSale))
        .WithTags(nameof(Invoice))
        .ProducesValidationProblem()
        .Produces<SaleResponse>(StatusCodes.Status200OK);

    }

    public record GetSaleQuery(int Id) : IRequest<IResult>;

    public record SaleResponse
    {
        public int Id { get; init; }
        public int IdBusiness { get; init; }
        public int Number { get; init; }
        public int? IdClient { get; init; }
        public string ClientName { get; init; } = string.Empty;
        public string State { get; init; } = string.Empty;
        public DateTime Date { get; init; } = DateTime.Now;
        public string PaymentType { get; init; } = string.Empty;
        public List<InvoiceDetailModel> Products { get; init; } = new();
    }


    public class GetSaleHandler(AppDbContext context) : IRequestHandler<GetSaleQuery, IResult>
    {
        public async Task<IResult> Handle(GetSaleQuery request, CancellationToken cancellationToken)
        {
            var sale = await context.Invoices
            .Include(x => x.Client)
            .Include(x => x.InvoiceDetails)
            .ThenInclude(x => x.Product)
            .Include(x => x.InvoicePayments)
            .Include(x => x.InvoiceServices)
            .FirstOrDefaultAsync(x => x.Id == request.Id);

            if (sale == null)
            {

                return Results.Ok(Result.Failure(new Error("Sale.NotFound", "Sale no encontrada")));
            }

            var saleResponse = new SaleResponse
            {
                IdBusiness = sale.BusinessId,
                IdClient = sale.ClientId,
                ClientName = sale.Client.LastName + " " + sale.Client.FirstName,
                Id = sale.Id,
                Number = sale.Number,
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
                }).ToList(),
            };

            return Results.Ok(Result<SaleResponse>.Success(saleResponse, "Sale obtenida correctamente"));
        }
    }


    public class GetSaleValidator : AbstractValidator<GetSaleQuery>
    {
        public GetSaleValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
        }
    }
}