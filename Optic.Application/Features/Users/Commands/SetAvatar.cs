using Carter;
using Carter.ModelBinding;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

public class SetAvatar : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/users/avatar", async (HttpRequest req, IMediator mediator, SetAvatarCommand command) =>
        {
            return await mediator.Send(command);
        })
        .WithName(nameof(SetAvatar))
        .WithTags(nameof(User))
        .ProducesValidationProblem()
        .Produces(StatusCodes.Status200OK);
    }
    public record SetAvatarCommand(int Id, int IdAvatar) : IRequest<Result>;

    public class SetAvatarHandler(AppDbContext context, IValidator<SetAvatarCommand> validator) : IRequestHandler<SetAvatarCommand, Result>
    {
        public async Task<Result> Handle(SetAvatarCommand request, CancellationToken cancellationToken)
        {

            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Result<IResult>.Failure(Results.ValidationProblem(result.GetValidationProblems()), new Error("Login.ErrorValidation", "Se presentaron errores de validación"));
            }


            var user = await context.Users.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (user == null)
            {
                return Result.Failure(new Error("User.ErrorNotFound", "Usuario no encontrado"));
            }
            user.SetAvatar(request.IdAvatar);
            var resCount = await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Result.Success("Avatar actualizado correctamente");
            }
            else
            {
                return Result.Failure(new Error("Login.ErrorCreateUser", "Error al actualizar el avatar del usuario"));
            }
        }
    }

    public class SetAvatarValidator : AbstractValidator<SetAvatarCommand>
    {
        public SetAvatarValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.IdAvatar).NotEmpty();
        }
    }
}