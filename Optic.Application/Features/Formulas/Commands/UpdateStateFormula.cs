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

namespace Optic.Application.Features.Formulas;

public class UpdateStateFormula : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("api/formulas/{id}/state", async (HttpRequest req, IMediator mediator, int id, UpdateStateFormulaCommand command) =>
        {
            return await mediator.Send(command);
        })
             .WithName(nameof(UpdateStateFormula))
             .WithTags(nameof(Formula))
             .ProducesValidationProblem()
             .Produces<int>(StatusCodes.Status201Created);
    }

    public record UpdateStateFormulaCommand : IRequest<IResult>
    {
        public int Id { get; init; }
        public string State { get; init; } = string.Empty;
    }

    public class UpdateStateFormulaHandler(AppDbContext context, IValidator<UpdateStateFormulaCommand> validator) : IRequestHandler<UpdateStateFormulaCommand, IResult>
    {
        public async Task<IResult> Handle(UpdateStateFormulaCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Results.Ok(Result<Dictionary<string, string[]>>.Failure(
                    result.GetValidationProblems(),
                    new Error("Formula.ErrorValidation", "Se presentaron errores de validación")
                ));
            }
            var formula = context.Formulas.Find(request.Id);

            if (formula == null)
                return Results.Ok(Result.Failure(new Error("Formula.ErrorUpdateFormula", "No se pudo actualizar el estado de la formula")));

            if (formula.State != "Borrador" && request.State == "Borrador")
                return Results.Ok(Result.Failure(new Error("Formula.ErrorUpdateFormula", "La formula no puede ser actualizada al estado: " + formula.State)));


            if (formula.State == "Borrador" && (request.State == "Crédito" || request.State == "Pagada"))
            {
                var invoice = context.Invoices.Find(formula.IdInvoice);
                if (invoice != null)
                {
                    //Agregar detalles de la factura
                    var productsInvoice = await context.InvoiceDetails.Where(x => x.IdInvoice == invoice.Id).ToListAsync();
                    foreach (var productDetail in productsInvoice)
                    {
                        var product = context.Products.Find(productDetail.IdProduct);
                        if (product != null)
                        {
                            product.UpdateQuantity(product.Quantity - productDetail.Quantity);
                        }
                    }
                }
            }

            formula.UpdateState(request.State);

            var resCount = await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Results.Ok(Result<int>.Success(formula.Id, $"Estado de la fomula actualizado a {formula.State}"));
            }
            else
            {
                return Results.Ok(Result.Failure(new Error("Formula.ErrorCreateFormula", $"Error al actualizar el estado de la formula a ${request.State}")));
            }

        }
    }
    public class UpdateStateFormulaValidator : AbstractValidator<UpdateStateFormulaCommand>
    {
        public UpdateStateFormulaValidator()
        {
            RuleFor(x => x.Id).NotEmpty().GreaterThan(0);
            RuleFor(x => x.State).NotEmpty();
        }
    }
}