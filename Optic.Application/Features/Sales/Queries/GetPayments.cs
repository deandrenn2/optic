
using Carter;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.Sales;
public class GetPayments : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/sales/{id:int}/payments", async (int id, IMediator mediator) =>
        {
            return await mediator.Send(new GetPaymentsRequest(id));
        })
        .WithName(nameof(GetPayments))
        .WithTags(nameof(Invoice))
        .ProducesValidationProblem()
        .Produces<List<PaymentsModel>>(StatusCodes.Status200OK);
    }

    public record GetPaymentsRequest(int InvoiceId) : IRequest<IResult>;

    public record GetPaymentsResponse(List<PaymentsModel> Payments);

    public class GetPaymentsHandler(AppDbContext context) : IRequestHandler<GetPaymentsRequest, IResult>
    {
        public async Task<IResult> Handle(GetPaymentsRequest request, CancellationToken cancellationToken)
        {

            var payments = await context.InvoicePayments.Where(x => x.IdInvoice == request.InvoiceId).ToListAsync();

            if (payments.Count == 0)
            {
                return Results.Ok(Result.Failure(new Error("Sale.ErrorGetPayments", "No se encontraron pagos para la factura")));
            }

            var paymentsResponse = new List<PaymentsModel>();

            foreach (var payment in payments)
            {
                var paymentResponse = new PaymentsModel
                {
                    Id = payment.Id,
                    Amount = payment.Amount,
                    Date = payment.Date
                };

                paymentsResponse.Add(paymentResponse);
            }

            return Results.Ok(Result<GetPaymentsResponse>.Success(new GetPaymentsResponse(paymentsResponse), "OK"));
        }
    }

    public class GetPaymentsValidator : AbstractValidator<GetPaymentsRequest>
    {
        public GetPaymentsValidator()
        {
            RuleFor(x => x.InvoiceId).NotEmpty();
        }
    }
}