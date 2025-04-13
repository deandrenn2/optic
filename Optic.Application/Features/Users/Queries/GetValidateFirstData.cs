using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;

namespace Optic.Application.Features.Users;
public class GetValidateFirstData : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/users/first/data", async (IMediator mediator) =>
        {
            return await mediator.Send(new GetValidateFirstDataQuery());
        })
             .WithName(nameof(GetValidateFirstData))
             .WithTags(nameof(User))
             .ProducesValidationProblem()
             .Produces<bool>(StatusCodes.Status200OK);
    }

    public record GetValidateFirstDataQuery() : IRequest<IResult>;

    public class GetValidateFirstDataHandler(AppDbContext contex) : IRequestHandler<GetValidateFirstDataQuery, IResult>
    {
        public async Task<IResult> Handle(GetValidateFirstDataQuery request, CancellationToken cancellationToken)
        {
            var hasUsers = await contex.Users.FirstOrDefaultAsync();

            if (hasUsers == null)
            {
                return Results.Ok(false);
            }

            var hasBusiness = await contex.Businesses.FirstOrDefaultAsync();

            if (hasBusiness == null)
            {
                return Results.Ok(false);
            }

            return Results.Ok(true);
        }
    }
}