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

public class UpdateBusiness : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("api/businesses", async (HttpRequest req, IMediator mediator, UpdateBusinessCommand command) =>
        {
            return await mediator.Send(command);
        })
        .WithName(nameof(UpdateBusiness))
        .WithTags(nameof(Business))
        .ProducesValidationProblem()
        .Produces(StatusCodes.Status200OK);
    }

    public record UpdateBusinessCommand(int IdBusiness, string CompanyName, string Abbreviation, string Nit, string Address, string City, string Phone, string CellPhoneNumber) : IRequest<Result>;

    public class UpdateBusinessHandler(AppDbContext context, IValidator<UpdateBusinessCommand> validator) : IRequestHandler<UpdateBusinessCommand, Result>
    {
        public async Task<Result> Handle(UpdateBusinessCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);

            if (!result.IsValid)
            {
                return Result<IResult>.Failure(Results.ValidationProblem(result.GetValidationProblems()), new Error("Login.ErrorValidation", "Se presentaron errores de validación"));
            }

            var business = await context.Businesses.FirstOrDefaultAsync(x => x.Id == request.IdBusiness);

            if (business == null)
            {
                return Result.Failure(new Error("Business.ErrorUpdateBusiness", "El negocio no existe"));
            }

            business.Update(request.CompanyName, request.Abbreviation, request.Nit, request.Address, request.City, request.CellPhoneNumber, request.Phone);

            var resCount = await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Result<UpdateBusinessCommand>.Success(request, "Negocio actualizado correctamente");
            }
            else
            {
                return Result.Failure(new Error("Login.ErrorUpdateBusiness", "Error al actualizar el negocio"));
            }

        }
    }

    public class UpdateBusinessValidator : AbstractValidator<UpdateBusinessCommand>
    {
        public UpdateBusinessValidator()
        {
            RuleFor(x => x.IdBusiness).NotEmpty();
            RuleFor(x => x.CompanyName).NotEmpty();
            RuleFor(x => x.Abbreviation).NotEmpty();
            RuleFor(x => x.Nit).NotEmpty();
        }
    }
}