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


public class UpdatePassword : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/users/password", async (HttpRequest req, IMediator mediator, UpdatePasswordCommand command) =>
        {
            return await mediator.Send(command);
        })
        .WithName(nameof(UpdatePassword))
        .WithTags(nameof(User))
        .ProducesValidationProblem()
        .Produces(StatusCodes.Status200OK);
    }

    public record UpdatePasswordCommand(string Email, string Password) : IRequest<Result>;

    public class UpdatePasswordHandler(AppDbContext context, IValidator<UpdatePasswordCommand> validator) : IRequestHandler<UpdatePasswordCommand, Result>
    {
        public async Task<Result> Handle(UpdatePasswordCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);

            if (!result.IsValid)
            {
                return Result<IResult>.Failure(Results.ValidationProblem(result.GetValidationProblems()), new Error("Login.ErrorValidation", "Se presentaron errores de validación"));
            }

            var user = await context.Users.FirstOrDefaultAsync(x => x.Email == request.Email);

            if (user == null)
            {
                return Result.Failure(new Error("User.ErrorUpdatePassword", "El usuario no existe"));
            }

            user.UpdatePassword(request.Password);

            var resCount = await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Result<User>.Success(user, "Contraseña actualizada correctamente");
            }
            else
            {
                return Result.Failure(new Error("Login.ErrorUpdatePassword", "Error al actualizar la contraseña"));
            }

        }
    }

    public class UpdatePasswordValidator : AbstractValidator<UpdatePasswordCommand>
    {
        public UpdatePasswordValidator()
        {
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.Password).NotEmpty()
                .WithMessage("El campo contraseña es obligatorio")
                .MinimumLength(6)
                .WithMessage("Mimimo 6 caracrteres");

        }
    }
}