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

namespace Optic.Application.Features.Settings;

public class UpdateIdentificationType : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("/api/settings/identificationType", async (HttpRequest req, UpdateIdentificationTypeCommand command, IMediator mediator) =>
        {
            return await mediator.Send(command);
        })
        .WithName(nameof(UpdateIdentificationType))
        .WithTags("Settings")
        .ProducesValidationProblem()
        .Produces(StatusCodes.Status200OK); ;
    }

    public record UpdateIdentificationTypeCommand(int Id, int Orden, string Name, string Abbreviation) : IRequest<Result>;

    public class UpdateIdentificationTypeCommandHandler(AppDbContext context, IValidator<UpdateIdentificationTypeCommand> validator) : IRequestHandler<UpdateIdentificationTypeCommand, Result>
    {
        public async Task<Result> Handle(UpdateIdentificationTypeCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Result<IResult>.Failure(Results.ValidationProblem(result.GetValidationProblems()), new Error("Product.ErrorValidation", "Se presentaron errores de validación"));
            }

            var identificationType = await context.IdentificationTypes.FirstOrDefaultAsync(x => x.Id == request.Id);

            if (identificationType == null)
            {
                return Result.Failure(new Error("IdentificationType.ErrorIdentificationTypeNoFound", "El tipo de identificación que intenta actualizar no existe"));
            }

            identificationType.Update(request.Orden, request.Name, request.Abbreviation);

            var resCount = await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Result<IdentificationType>.Success(identificationType, "Tipo de identificación actualizado correctamente");
            }
            else
            {
                return Result.Failure(new Error("IdentificationType.ErrorUpdateIdentificationType", "Error al actualizar el tipo de identificación"));
            }
        }
    }

    public class UpdateIdentificationTypeValidator : AbstractValidator<UpdateIdentificationTypeCommand>
    {
        public UpdateIdentificationTypeValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Orden).NotEmpty();
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Abbreviation).NotEmpty();
        }
    }
}