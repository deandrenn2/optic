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

namespace Optic.Application.Features.Purchases;
public class DeletePaymentPurchase : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete("api/purchases/payments/{idPayment:int}", async (int id, int idPayment, IMediator mediator) =>
        {
            return await mediator.Send(new DeletePaymentRequest(idPayment));
        })
        .WithName(nameof(DeletePaymentPurchase))
        .WithTags(nameof(Purchase))
        .ProducesValidationProblem()
        .Produces<int>(StatusCodes.Status200OK);
    }

    public record DeletePaymentRequest(int IdPayment) : IRequest<IResult>;

    public class DeletePaymentHandler(AppDbContext context, IValidator<DeletePaymentRequest> validator) : IRequestHandler<DeletePaymentRequest, IResult>
    {
        public async Task<IResult> Handle(DeletePaymentRequest request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Results.Ok(Result<Dictionary<string, string[]>>.Failure(
                    result.GetValidationProblems(),
                    new Error("Purchase.ErrorValidation", "Se presentaron errores de validación")
                ));
            }

            var purchasePayment = await context.PurchasePayments.FindAsync(request.IdPayment);

            if (purchasePayment == null)
            {
                return Results.Ok(Result.Failure(new Error("Purchase.ErrorDeletePayment", "No se encontró el pago")));
            }

            context.PurchasePayments.Remove(purchasePayment);

            var resCount = await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Results.Ok(Result<int>.Success(request.IdPayment, "Pago eliminado correctamente"));
            }
            else
            {
                return Results.Ok(Result.Failure(new Error("Purchase.ErrorDeletePayment", "Error al eliminar el pago")));
            }
        }
    }

    public class DeletePaymentValidator : AbstractValidator<DeletePaymentRequest>
    {
        public DeletePaymentValidator()
        {
            RuleFor(x => x.IdPayment).NotEmpty();
        }
    }
}