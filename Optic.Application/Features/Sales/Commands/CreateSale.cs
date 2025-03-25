using Carter;
using Carter.ModelBinding;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.Sales;

public class CreateSale : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/sales", async (HttpRequest req, IMediator mediator, CreateSaleCommand command) =>
        {
            return await mediator.Send(command);
        })
             .WithName(nameof(CreateSale))
             .WithTags(nameof(Invoice))
             .ProducesValidationProblem()
             .Produces<int>(StatusCodes.Status201Created);
    }

    public record CreateSaleCommand : IRequest<IResult>
    {
        public int? Id { get; init; }
        public int IdBusiness { get; init; }
        public int? IdClient { get; init; }
        public DateTime Date { get; init; } = DateTime.Now;
        public string PaymentType { get; init; } = string.Empty;
        public List<string> Tags { get; init; } = new();
        public List<InvoiceDetailModel> Products { get; init; } = new();
        public decimal SumTotal { get; init; }
    }

    public class CreateSaleHandler(AppDbContext context, IValidator<CreateSaleCommand> validator) : IRequestHandler<CreateSaleCommand, IResult>
    {
        public async Task<IResult> Handle(CreateSaleCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Results.Ok(Result<Dictionary<string, string[]>>.Failure(
                    result.GetValidationProblems(),
                    new Error("Sale.ErrorValidation", "Se presentaron errores de validación")
                ));
            }

            int invoiceMaxNumber = 0;

            var count = await context.Invoices.CountAsync();

            if (count > 0)
                invoiceMaxNumber = await context.Invoices.MaxAsync(x => x.Number);

            var invoice = Invoice.Create(0, invoiceMaxNumber + 1, request.Date, request.SumTotal, "Borrador", request.PaymentType, request.IdBusiness, request.IdClient);

            //Agregar detalles de la factura
            foreach (var product in request.Products)
            {
                var newDetail = InvoiceDetail.Create(0, invoice.Id, product.IdProduct, product.Description, product.Price, product.Quantity);

                invoice.AddDetail(newDetail);
            }

            context.Add(invoice);

            var resCount = await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Results.Ok(Result<int>.Success(invoice.Id, "Factura creada correctamente"));
            }
            else
            {
                return Results.Ok(Result.Failure(new Error("Sale.ErrorCreateSale", "Error al crear la factura")));
            }

        }
    }
    public class CreateSaleValidator : AbstractValidator<CreateSaleCommand>
    {
        public CreateSaleValidator()
        {
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.IdClient).NotEmpty().GreaterThan(0);
        }
    }
}