using Carter;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;


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
        public int? IdClient { get; init; }
        public string ClientName { get; init; } = string.Empty;
        public string State { get; init; } = string.Empty;
        public DateTime Date { get; init; } = DateTime.Now;

        public int IdInvoice { get; init; }

        public List<string> Tags { get; init; } = new();

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


    public class GetSaleHandler(AppDbContext context) : IRequestHandler<GetSaleQuery, IResult>
    {
        public async Task<IResult> Handle(GetSaleQuery request, CancellationToken cancellationToken)
        {
            var sale = await context.Invoices
            .Include(x => x.Client)
            .Include(x => x.InvoiceDetails).ThenInclude(x => x.Product)
            .Include(x => x.InvoicePayments)
            .ThenInclude(x => x.Invoice)
            .Include(x => x.InvoiceServices)
            .ThenInclude(x => x.Invoice)
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