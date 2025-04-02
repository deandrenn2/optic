using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

public class GetCountData : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/dashboard/count", async (IMediator mediator) =>
        {
            return await mediator.Send(new GetCountDataRequest());
        })
        .WithName(nameof(GetCountData))
        .WithTags("Dashboard")
        .ProducesValidationProblem()
        .Produces<GetCountDataResponse>(StatusCodes.Status200OK);
    }

    public record GetCountDataRequest() : IRequest<IResult>;

    public record GetCountDataResponse(Int32 ClientCount, Int32 ProductCount, decimal? DailyRevenue);

    public class GetCountDataHandler(AppDbContext context) : IRequestHandler<GetCountDataRequest, IResult>
    {
        public async Task<IResult> Handle(GetCountDataRequest request, CancellationToken cancellationToken)
        {
            var dailyRevenue = 0M;
            var clientCount = await context.Clients.CountAsync();
            var productCount = await context.Products.CountAsync();
            var invoiceLst = await context.Invoices.Where(x => x.PaymentType == "Contado" && x.Date >= DateTime.Today && x.Date < DateTime.Today.AddDays(1)).ToArrayAsync();

            if (invoiceLst.Length > 0)
            {
                dailyRevenue = invoiceLst.Sum(x => x.Total);
            }

            return Results.Ok(Result<GetCountDataResponse>.Success(new GetCountDataResponse(clientCount, productCount, dailyRevenue), "OK"));
        }
    }
}