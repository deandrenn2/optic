using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;

public class GetValidateFirstBusiness : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/businesses/first", async (IMediator mediator) =>
        {
            return await mediator.Send(new GetValidateFirstBusinessQuery());
        })
             .WithName(nameof(GetValidateFirstBusiness))
             .WithTags(nameof(Business))
             .ProducesValidationProblem()
             .Produces<bool>(StatusCodes.Status200OK);
    }

    public record GetValidateFirstBusinessQuery() : IRequest<IResult>;

    public class GetValidateFirstBusinessHandler(AppDbContext contex) : IRequestHandler<GetValidateFirstBusinessQuery, IResult>
    {
        public async Task<IResult> Handle(GetValidateFirstBusinessQuery request, CancellationToken cancellationToken)
        {
            var hasBusiness = await contex.Businesses.FirstOrDefaultAsync();

            if (hasBusiness == null)
            {
                return Results.Ok(false);
            }

            return Results.Ok(true);
        }
    }
}