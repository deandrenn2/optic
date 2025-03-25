using Carter;
using Carter.ModelBinding;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.Purchases;

public class UpdateStatePurchase : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("api/purchases/{id}/state", async (HttpRequest req, IMediator mediator, int id, UpdateStatePurchaseCommand command) =>
        {
            return await mediator.Send(command);
        })
             .WithName(nameof(UpdateStatePurchase))
             .WithTags(nameof(Purchase))
             .ProducesValidationProblem()
             .Produces<int>(StatusCodes.Status201Created);
    }

    public record UpdateStatePurchaseCommand : IRequest<IResult>
    {
        public int Id { get; init; }
        public string State { get; init; } = string.Empty;
    }

    public class UpdateStatePurchaseHandler(AppDbContext context, IValidator<UpdateStatePurchaseCommand> validator) : IRequestHandler<UpdateStatePurchaseCommand, IResult>
    {
        public async Task<IResult> Handle(UpdateStatePurchaseCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Results.Ok(Result<Dictionary<string, string[]>>.Failure(
                    result.GetValidationProblems(),
                    new Error("Purchase.ErrorValidation", "Se presentaron errores de validación")
                ));
            }
            var purchase = context.Purchases.Find(request.Id);

            if (purchase == null)
                return Results.Ok(Result.Failure(new Error("Purchase.ErrorUpdateFormula", "No se pudo actualizar la compra")));

            if (request.State != "Borrador" && request.State == "Borrador")
                return Results.Ok(Result.Failure(new Error("Purchase.ErrorUpdateFormula", "La compra no puede ser actualizada al eatado: " + purchase.State)));

            purchase.UpdateState(request.State);

            var resCount = await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Results.Ok(Result<int>.Success(purchase.Id, "Compra creada correctamente"));
            }
            else
            {
                return Results.Ok(Result.Failure(new Error("Purchase.ErrorCreateFormula", "Error al actualizar el estado de la compra")));
            }

        }
    }
    public class UpdateStatePurchaseValidator : AbstractValidator<UpdateStatePurchaseCommand>
    {
        public UpdateStatePurchaseValidator()
        {
            RuleFor(x => x.Id).NotEmpty().GreaterThan(0);
            RuleFor(x => x.State).NotEmpty();
        }
    }
}