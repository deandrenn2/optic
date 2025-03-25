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

public class DeletePurchase : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete("api/purchases/{id}", async (int id, IMediator mediator) =>
        {
            return await mediator.Send(new DeletePurchaseCommand { Id = id });
        })
             .WithName(nameof(DeletePurchase))
             .WithTags(nameof(Purchase))
             .ProducesValidationProblem()
             .Produces<int>(StatusCodes.Status200OK);
    }

    public record DeletePurchaseCommand : IRequest<IResult>
    {
        public int Id { get; init; }
    }

    public class DeletePurchaseHandler(AppDbContext context, IValidator<DeletePurchaseCommand> validator) : IRequestHandler<DeletePurchaseCommand, IResult>
    {
        public async Task<IResult> Handle(DeletePurchaseCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Results.Ok(Result<IResult>.Failure(Results.ValidationProblem(result.GetValidationProblems()), new Error("Purchase.ErrorValidation", "Se presentaron errores de validación")));
            }

            var purchase = await context.Purchases.FindAsync(request.Id);

            if (purchase == null)
            {
                return Results.Ok(Result.Failure(new Error("Purchase.ErrorDelete", "No se encontró la compra")));
            }

            context.Purchases.Remove(purchase);

            var resCount = await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Results.Ok(Result<int>.Success(purchase.Id, "Compra eliminada correctamente"));
            }
            else
            {
                return Results.Ok(Result.Failure(new Error("Purchase.ErrorDelete", "Error al eliminar la compra")));
            }
        }
    }

    public class DeletePurchaseValidator : AbstractValidator<DeletePurchaseCommand>
    {
        public DeletePurchaseValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
        }
    }


}