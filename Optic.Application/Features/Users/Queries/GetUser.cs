using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;

namespace Optic.Application.Features.Users.Queries;
public class GetUser : ICarterModule
{
    public record GetUserResponse(int Id, string FirstName, string LastName, string Email);

    public record GetUserQuery(int Id) : IRequest<GetUserResponse>;

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/users", async (int id, IMediator mediator) =>
        {
            return await mediator.Send(new GetUserQuery(id));
        })
        .WithName(nameof(GetUser))
        .WithTags(nameof(User))
        .Produces(StatusCodes.Status200OK);
    }

    public class GetUserHandler(AppDbContext context) : IRequestHandler<GetUserQuery, GetUserResponse>
    {
        public async Task<GetUserResponse> Handle(GetUserQuery request, CancellationToken cancellationToken)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.Id == request.Id);

            if (user == null)
            {
                return new GetUserResponse(0, "", "", "");
            }

            return new GetUserResponse(user.Id, user.FirstName, user.LastName, user.Email);
        }


    }
}

