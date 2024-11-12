using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.Users.Queries;
public class GetUsers : ICarterModule
{
    public record GetUsersResponse(int Id, string? FirstName, string? LastName, string? Email);

    public record GetUsersQuery() : IRequest<Result>;

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/users", async (IMediator mediator) =>
        {
            return await mediator.Send(new GetUsersQuery());
        })
        .WithName(nameof(GetUsers))
        .WithTags(nameof(User))
        .Produces(StatusCodes.Status200OK);
    }

    public class GetUserHandler(AppDbContext context) : IRequestHandler<GetUsersQuery, Result>
    {
        public async Task<Result> Handle(GetUsersQuery request, CancellationToken cancellationToken)
        {
            var users = await context.Users.ToListAsync();

            var userList = users.Select(x => new GetUsersResponse(
                x.Id,
                x.FirstName,
                x.LastName,
                x.Email
                )).ToList();

            return Result<List<GetUsersResponse>>.Success(userList, "Listado de usuarios");
        }
    }
}

