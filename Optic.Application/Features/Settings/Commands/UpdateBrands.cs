using System.Text.Json;
using Carter;
using Carter.ModelBinding;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.Settings;

public class UpdateBrands : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("/api/settings/brands", async (HttpRequest req, UpdateBrandsCommand command, IMediator mediator) =>
        {
            return await mediator.Send(command);
        })
        .WithName(nameof(UpdateBrands))
        .WithTags("Settings")
        .ProducesValidationProblem()
        .Produces(StatusCodes.Status200OK); ;
    }

    public record UpdateBrandsCommand() : IRequest<IResult>
    {
        public List<BrandModel> Brands { get; set; } = new List<BrandModel>();
    }

    public class UpdateBrandsCommandHandler(AppDbContext context, IValidator<UpdateBrandsCommand> validator) : IRequestHandler<UpdateBrandsCommand, IResult>
    {
        public async Task<IResult> Handle(UpdateBrandsCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Results.Ok(Result<Dictionary<string, string[]>>.Failure(
                    result.GetValidationProblems(),
                    new Error("Formula.ErrorValidation", "Se presentaron errores de validación")
                ));
            }

            var brandsSettings = await context.Settings.Where(x => x.Name == "LIST_BRAND").FirstOrDefaultAsync();

            if (brandsSettings != null)
            {
                var brandsList = JsonSerializer.Serialize(request.Brands);
                brandsSettings.Update(brandsList);
            }


            var resCount = await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Results.Ok(Result.Success("Configuraciones actualizadas correctamente"));
            }
            else
            {
                return Results.Ok(Result.Failure(new Error("Setting.ErrorUpdateSetting", "Error al actualizar la configuración")));
            }
        }
    }

    public class UpdateBrandsValidator : AbstractValidator<UpdateBrandsCommand>
    {
        public UpdateBrandsValidator()
        {
            RuleFor(x => x.Brands).NotEmpty();
        }
    }
}