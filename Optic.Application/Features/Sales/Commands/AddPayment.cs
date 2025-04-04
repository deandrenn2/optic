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
public class AddPayment : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/sales/{id:int}/payments", async (int id, HttpRequest req, IMediator mediator, AddPaymentRequest command) =>
        {
            return await mediator.Send(command);
        })
        .WithName(nameof(AddPayment))
        .WithTags(nameof(Invoice))
        .ProducesValidationProblem()
        .Produces<decimal>(StatusCodes.Status201Created);
    }

    public record AddPaymentRequest(int InvoiceId, decimal Amount) : IRequest<IResult>;

    public class AddPaymentHandler(AppDbContext context, IValidator<AddPaymentRequest> validator) : IRequestHandler<AddPaymentRequest, IResult>
    {
        public async Task<IResult> Handle(AddPaymentRequest request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Results.Ok(Result<Dictionary<string, string[]>>.Failure(
                    result.GetValidationProblems(),
                    new Error("Sale.ErrorValidation", "Se presentaron errores de validación")
                ));
            }

            var invoice = await context.Invoices.FindAsync(request.InvoiceId);

            if (invoice == null)
            {
                return Results.Ok(Result.Failure(new Error("Sale.ErrorAddPayment", "No se encontró la factura")));
            }

            var payment = InvoicePayment.Create(0, invoice.Id, request.Amount);

            invoice.AddPayment(payment);

            var resCount = await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Results.Ok(Result<int>.Success(payment.Id, "Pago creado correctamente"));
            }
            else
            {
                return Results.Ok(Result.Failure(new Error("Sale.ErrorAddPayment", "Error al crear el pago")));
            }
        }
    }

    public class AddPaymentValidator : AbstractValidator<AddPaymentRequest>
    {
        public AddPaymentValidator()
        {
            RuleFor(x => x.InvoiceId).NotEmpty();
            RuleFor(x => x.Amount).NotEmpty();
        }
    }
}