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

namespace Optic.Application.Features.Sales;
public class DeletePayment : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete("api/sales/payments/{idPayment:int}", async (int idPayment, IMediator mediator) =>
        {
            return await mediator.Send(new DeletePaymentRequest(idPayment));
        })
        .WithName(nameof(DeletePayment))
        .WithTags(nameof(Invoice))
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
                    new Error("Sale.ErrorValidation", "Se presentaron errores de validación")
                ));
            }

            var invoicePayment = await context.InvoicePayments.FindAsync(request.IdPayment);

            if (invoicePayment == null)
            {
                return Results.Ok(Result.Failure(new Error("Sale.ErrorDeletePayment", "No se encontró el pago")));
            }

            context.InvoicePayments.Remove(invoicePayment);

            var resCount = await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Results.Ok(Result<int>.Success(request.IdPayment, "Pago eliminado correctamente"));
            }
            else
            {
                return Results.Ok(Result.Failure(new Error("Sale.ErrorDeletePayment", "Error al eliminar el pago")));
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