using Carter;
using Carter.ModelBinding;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Optic.Application.Domain.Entities;
using Optic.Application.Features.Businesses;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.Clients;

public class CreateClients : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/clients", async (HttpRequest req, IMediator mediator, CreateClientCommand command) =>
        {
            return await mediator.Send(command);
        })
        .WithName(nameof(CreateClients))
        .WithTags(nameof(Client))
        .ProducesValidationProblem()
        .Produces(StatusCodes.Status201Created);
    }

    public record CreateClientCommand : IRequest<Result>
    {
        public string FirstName { get; init; } = string.Empty;
        public string LastName { get; init; } = string.Empty;
        public int Sex { get; init; }
        public int IdentificationTypeId { get; init; } 
        public string IdentificationNumber { get; init; } = string.Empty;
        public string Email { get; init; } = string.Empty;
        public string Address { get; init; } = string.Empty;
        public string CellPhoneNumber { get; init; } = string.Empty;
        public string PhoneNumber { get; init; } = string.Empty;
    }

    public class CreateProductHandler(AppDbContext context, IValidator<CreateClientCommand> validator) : IRequestHandler<CreateClientCommand, Result>
    {
        public async Task<Result> Handle(CreateClientCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Result<IResult>.Failure(Results.ValidationProblem(result.GetValidationProblems()), new Error("Login.ErrorValidation", "Se presentaron errores de validación"));
            }

            var newClient = Client
                .Create(0, 
                request.FirstName, 
                request.LastName, 
                request.Sex,
                request.IdentificationTypeId, 
                request.IdentificationNumber,
                request.Email,
                request.Address,
                request.CellPhoneNumber,
                request.PhoneNumber);

            context.Add(newClient);    

            var resCount = await context.SaveChangesAsync();


            if (resCount > 0)
            {
                return Result<Client>.Success(newClient, "Usuario creado correctamente");
            }
            else
            {
                return Result.Failure(new Error("Login.ErrorCreateUser", "Error al crear el usuario"));
            }


        }
    }

    public class CreateClientValidator : AbstractValidator<CreateClientCommand>
    {
        public CreateClientValidator()
        {
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();
            RuleFor(x => x.IdentificationNumber).NotEmpty();
            RuleFor(x => x.IdentificationTypeId).NotEmpty();
        }
    }
}

