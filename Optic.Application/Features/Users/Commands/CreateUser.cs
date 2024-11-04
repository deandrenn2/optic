using Carter;
using Carter.ModelBinding;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;

namespace Optic.Application.Features.Users.Commands;

public class CreateUser : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/users", async (HttpRequest req, IMediator mediator, CreateUserCommand command) =>
        {
            return await mediator.Send(command);
        })
        .WithName(nameof(CreateUser))
        .WithTags(nameof(User))
        .ProducesValidationProblem()
        .Produces(StatusCodes.Status201Created);
    }

    public record CreateUserCommand : IRequest<IResult>
    {
        public string FirstName { get; init; } = string.Empty;
        public string LastName { get; init; } = string.Empty;
        public string Email { get; init; } = string.Empty;
        public string Password { get; init; } = string.Empty;
        public string SecurePharse { get; init; } = string.Empty;
    }

    public class CreateProductHandler(AppDbContext context, IValidator<CreateUserCommand> validator) : IRequestHandler<CreateUserCommand, IResult>
    {
        public async Task<IResult> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Results.ValidationProblem(result.GetValidationProblems());
            }

            var newUser = User.Create(0, request.FirstName, request.LastName, request.Email, request.Password, request.SecurePharse);

            context.Add(newUser);    

            await context.SaveChangesAsync();

            return Results.Created($"api/users/{newUser.Id}", null);

        }
    }

    public class CreateUserValidator : AbstractValidator<CreateUserCommand>
    {
        public CreateUserValidator()
        {
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();
            RuleFor(x => x.Email).NotEmpty().EmailAddress();

            RuleFor(x => x.Password).NotEmpty()
                .WithMessage("El campo contraseña es obligatorio")
                .MinimumLength(6)
                .WithMessage("Mimimo 6 caracrteres");

        }
    }
}

