using Carter;
using Carter.ModelBinding;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.Businesses;

public class CreateBusiness : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/businesses", async (HttpRequest req, IMediator mediator, CreateBusinessCommand command) =>
        {
            return await mediator.Send(command);
        })
        .WithName(nameof(CreateBusiness))
        .WithTags(nameof(Business))
        .ProducesValidationProblem()
        .Produces(StatusCodes.Status201Created);
    }

    public record CreateBusinessCommand : IRequest<Result>
    {
        public string CompanyName { get; init; } = string.Empty;
        public string Abbreviation { get; init; } = string.Empty;
        public string Nit { get; init; } = string.Empty;
        public string Address { get; init; } = string.Empty;
        public string City { get; init; } = string.Empty;
        public string CellPhoneNumber { get; init; } = string.Empty;
        public string PhoneNumber { get; init; } = string.Empty;
        public string UrlLogo { get; init; } = "initials-logo.svg";
    }

    public class CreateProductHandler(AppDbContext context, IValidator<CreateBusinessCommand> validator) : IRequestHandler<CreateBusinessCommand, Result>
    {
        public async Task<Result> Handle(CreateBusinessCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Result<IResult>.Failure(Results.ValidationProblem(result.GetValidationProblems()), new Error("Login.ErrorValidation", "Se presentaron errores de validación"));
            }

            var newBusiness = Business
                .Create(0, 
                request.CompanyName, 
                request.Abbreviation,
                request.Nit, 
                request.Address,
                request.City,   
                request.CellPhoneNumber, 
                request.PhoneNumber
                );

            context.Add(newBusiness);

            var resCount = await context.SaveChangesAsync();


            if (resCount > 0)
            {
                return Result<Business>.Success(newBusiness, "Usuario creado correctamente");
            }
            else
            {
                return Result.Failure(new Error("Login.ErrorCreateUser", "Error al crear el usuario"));
            }

            //return Results.Created($"api/clients/{newBusiness.Id}", null);

        }
    }

    public class CreateBusinessValidator : AbstractValidator<CreateBusinessCommand>
    {
        public CreateBusinessValidator()
        {
            RuleFor(x => x.CompanyName).NotEmpty();
            RuleFor(x => x.Abbreviation).NotEmpty();
            RuleFor(x => x.Address).NotEmpty();
            RuleFor(x => x.City).NotEmpty();
            RuleFor(x => x.CellPhoneNumber).NotEmpty();
            RuleFor(x => x.Nit).NotEmpty();
        }
    }
}

