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

public class ValidateSecurePharse : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/users/securePharse", async (HttpRequest req, IMediator mediator, ValidateSecurePharseCommand command) =>
        {
            return await mediator.Send(command);
        })
        .WithName(nameof(ValidateSecurePharse))
        .WithTags(nameof(User))
        .ProducesValidationProblem()
        .Produces(StatusCodes.Status200OK);
    }

    public record ValidateSecurePharseCommand(string Email, string SecurePharse) : IRequest<Result>;

    public class ValidateSecurePharseHandler(AppDbContext context, IValidator<ValidateSecurePharseCommand> validator) : IRequestHandler<ValidateSecurePharseCommand, Result>
    {
        public async Task<Result> Handle(ValidateSecurePharseCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);

            var user = await context.Users.FirstOrDefaultAsync(x => x.Email == request.Email);

            if (user == null)
            {
                return Result.Failure(new Error("User.ErrorValidateSecurePharse", "El usuario no existe"));
            }

            var isValidSucerePharse = user.ValidateSecurePharse(request.SecurePharse);

            if (!isValidSucerePharse)
            {
                return Result.Failure(new Error("User.ErrorValidation", "La frase de seguridad no es valida"));
            }
            return await Task.FromResult(Result.Success("La frase de seguridad es valida"));
        }
    }

    public class ValidateSecurePharseValidator : AbstractValidator<ValidateSecurePharseCommand>
    {
        public ValidateSecurePharseValidator()
        {
            RuleFor(x => x.SecurePharse).NotEmpty();
        }
    }

}