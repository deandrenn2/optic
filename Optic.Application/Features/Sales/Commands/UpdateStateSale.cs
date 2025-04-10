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
public class UpdateStateSale : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("api/sales/{id}/state", async (HttpRequest req, IMediator mediator, int id, UpdateStateSaleCommand command) =>
        {
            return await mediator.Send(command);
        })
             .WithName(nameof(UpdateStateSale))
             .WithTags(nameof(Invoice))
             .ProducesValidationProblem()
             .Produces<int>(StatusCodes.Status200OK);
    }

    public record UpdateStateSaleCommand : IRequest<IResult>
    {
        public int Id { get; init; }
        public string State { get; init; } = string.Empty;
    }

    public class UpdateStateFormulaHandler(AppDbContext context, IValidator<UpdateStateSaleCommand> validator) : IRequestHandler<UpdateStateSaleCommand, IResult>
    {
        public async Task<IResult> Handle(UpdateStateSaleCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Results.Ok(Result<Dictionary<string, string[]>>.Failure(
                    result.GetValidationProblems(),
                    new Error("Sale.ErrorValidation", "Se presentaron errores de validación")
                ));
            }
            var invoice = context.Invoices.Find(request.Id);

            if (invoice == null)
                return Results.Ok(Result.Failure(new Error("Sale.ErrorUpdateFormula", "No se pudo actualizar la factura")));

            if (invoice.State != "Borrador" && request.State == "Borrador")
                return Results.Ok(Result.Failure(new Error("Sale.ErrorUpdateFormula", "La factura no puede ser actualizada al estado: " + invoice.State)));

            if ((invoice.State == "Pagada" || invoice.State == "Crédito") && (request.State == "Anulada" || request.State == "Devolución"))
            {

                //Agregar detalles de la factura
                var productsInvoice = await context.InvoiceDetails.Where(x => x.IdInvoice == invoice.Id).ToListAsync();
                foreach (var productDetail in productsInvoice)
                {
                    var product = context.Products.Find(productDetail.IdProduct);
                    if (product != null)
                    {
                        product.UpdateQuantity(product.Quantity + productDetail.Quantity);
                    }
                }

                invoice.UpdateState(request.State);

            }


            invoice.UpdateState(request.State);

            var resCount = await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Results.Ok(Result<int>.Success(invoice.Id, "Formula creada correctamente"));
            }
            else
            {
                return Results.Ok(Result.Failure(new Error("Sale.ErrorCreateFormula", "Error al crear la factura")));
            }

        }
    }
    public class UpdateStateSaleValidator : AbstractValidator<UpdateStateSaleCommand>
    {
        public UpdateStateSaleValidator()
        {
            RuleFor(x => x.Id).NotEmpty().GreaterThan(0);
            RuleFor(x => x.State).NotEmpty();
        }
    }
}