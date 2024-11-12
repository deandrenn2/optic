using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.Users.Queries;
public class GetUser : ICarterModule
{
    public record GetUserResponse(int Id, string FirstName, string LastName, string Email, int IdAvatar);

    public record GetUserQuery(int Id) : IRequest<Result>;

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/users/{id}", async (int id, IMediator mediator) =>
        {
            return await mediator.Send(new GetUserQuery(id));
        })
        .WithName(nameof(GetUser))
        .WithTags(nameof(User))
        .Produces(StatusCodes.Status200OK);
    }

    public class GetUserHandler(AppDbContext context) : IRequestHandler<GetUserQuery, Result>
    {
        public async Task<Result> Handle(GetUserQuery request, CancellationToken cancellationToken)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.Id == request.Id);

            if (user == null)
            {
                return Result.Failure(new Error("User.ErrorData", "El id de usuario no existe"));
            }

            return Result<GetUserResponse>.Success(new GetUserResponse(user.Id, user.FirstName, user.LastName, user.Email, user.IdAvatar), "Datos del usuario");
        }
    }
}

