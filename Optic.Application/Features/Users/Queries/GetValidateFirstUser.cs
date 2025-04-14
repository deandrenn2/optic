using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.Users;

public class GetValidateFirst : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/users/first", async (IMediator mediator) =>
        {
            return await mediator.Send(new GetValidateFirstDataQuery());
        })
             .WithName(nameof(GetValidateFirst))
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
                return Results.Ok(Result<bool>.Success(false, "No hay usuarios en la base de datos"));
            }

            return Results.Ok(Result<bool>.Success(true, "Datos de usuarios cargados"));
        }
    }
}