using Carter;
using Carter.ModelBinding;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;

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

    public record CreateBusinessCommand : IRequest<IResult>
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

    public class CreateProductHandler(AppDbContext context, IValidator<CreateBusinessCommand> validator) : IRequestHandler<CreateBusinessCommand, IResult>
    {
        public async Task<IResult> Handle(CreateBusinessCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Results.ValidationProblem(result.GetValidationProblems());
            }

            var newUser = Business
                .Create(0, 
                request.CompanyName, 
                request.Abbreviation,
                request.Nit, 
                request.Address,
                request.City,   
                request.CellPhoneNumber, 
                request.PhoneNumber
                );

            context.Add(newUser);    

            await context.SaveChangesAsync();

            return Results.Created($"api/clients/{newUser.Id}", null);

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

