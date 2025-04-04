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
public class AddPaymentPurchase : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/purchases/{id:int}/payments", async (int id, HttpRequest req, IMediator mediator, AddPaymentRequest command) =>
        {
            return await mediator.Send(command);
        })
        .WithName(nameof(AddPaymentPurchase))
        .WithTags(nameof(Purchase))
        .ProducesValidationProblem()
        .Produces<int>(StatusCodes.Status201Created);
    }

    public record AddPaymentRequest(int PurchaseId, decimal Amount) : IRequest<IResult>;
    public class AddPaymentHandler(AppDbContext context, IValidator<AddPaymentRequest> validator) : IRequestHandler<AddPaymentRequest, IResult>
    {
        public async Task<IResult> Handle(AddPaymentRequest request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Results.Ok(Result<Dictionary<string, string[]>>.Failure(
                    result.GetValidationProblems(),
                    new Error("Purchase.ErrorValidation", "Se presentaron errores de validación")
                ));
            }

            var purchase = await context.Purchases.FindAsync(request.PurchaseId);

            if (purchase == null)
            {
                return Results.Ok(Result.Failure(new Error("Purchase.ErrorAddPayment", "No se encontró la compra")));
            }

            var payment = PurchasePayment.Create(0, purchase.Id, request.Amount);

            purchase.AddPayment(payment);

            var resCount = await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Results.Ok(Result<int>.Success(payment.Id, "Pago creado correctamente"));
            }
            else
            {
                return Results.Ok(Result.Failure(new Error("Purchase.ErrorAddPayment", "Error al crear el pago")));
            }
        }
    }

    public class AddPaymentValidator : AbstractValidator<AddPaymentRequest>
    {
        public AddPaymentValidator()
        {
            RuleFor(x => x.PurchaseId).NotEmpty();
            RuleFor(x => x.Amount).NotEmpty();
        }
    }
}