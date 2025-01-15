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

public class UpdateUser : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("api/users", async (HttpRequest req, IMediator mediator, UpdateUserCommand command) =>
        {
            return await mediator.Send(command);
        })
        .WithName(nameof(UpdateUser))
        .WithTags(nameof(User))
        .ProducesValidationProblem()
        .Produces(StatusCodes.Status200OK);
    }

    public record UpdateUserCommand(string FirstName, string LastName, string Email) : IRequest<Result>;

    public class UpdateUserHandler(AppDbContext context, IValidator<UpdateUserCommand> validator) : IRequestHandler<UpdateUserCommand, Result>
    {
        public async Task<Result> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);

            if (!result.IsValid)
            {
                return Result<IResult>.Failure(Results.ValidationProblem(result.GetValidationProblems()), new Error("Login.ErrorValidation", "Se presentaron errores de validación"));
            }

            var user = await context.Users.FirstOrDefaultAsync(x => x.Email == request.Email);

            if (user == null)
            {
                return Result.Failure(new Error("User.ErrorUpdateUser", "El usuario no existe"));
            }

            user.Update(request.FirstName, request.LastName, request.Email);

            var resCount = await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Result<UpdateUserCommand>.Success(new UpdateUserCommand(user.Email, user.FirstName, user.LastName), "Usuario actualizado correctamente");
            }
            else
            {
                return Result.Failure(new Error("Login.ErrorUpdateUser", "Error al actualizar el usuario"));
            }

        }
    }

    public class UpdateUserValidator : AbstractValidator<UpdateUserCommand>
    {
        public UpdateUserValidator()
        {
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
        }
    }
}