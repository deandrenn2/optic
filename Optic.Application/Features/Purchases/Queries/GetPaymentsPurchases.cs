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

namespace Optic.Application.Features.Purchases;
public class GetPaymentsPurchases : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/purchases/{id:int}/payments", async (int id, IMediator mediator) =>
        {
            return await mediator.Send(new GetPaymentsRequest(id));
        })
        .WithName(nameof(GetPaymentsPurchases))
        .WithTags(nameof(Purchase))
        .ProducesValidationProblem()
        .Produces<List<PaymentsModel>>(StatusCodes.Status200OK);
    }

    public record GetPaymentsRequest(int PurchaseId) : IRequest<IResult>;

    public record GetPaymentsResponse(List<PaymentsModel> Payments);

    public class GetPaymentsHandler(AppDbContext context) : IRequestHandler<GetPaymentsRequest, IResult>
    {
        public async Task<IResult> Handle(GetPaymentsRequest request, CancellationToken cancellationToken)
        {

            var payments = await context.PurchasePayments.Where(x => x.IdPurchase == request.PurchaseId).OrderBy(x => x.Date).ToListAsync();

            if (payments.Count == 0)
            {
                return Results.Ok(Result.Failure(new Error("Sale.ErrorGetPayments", "No se encontraron pagos para la compra")));
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
            RuleFor(x => x.PurchaseId).NotEmpty();
        }
    }
}