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

public class UpdateSetting : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("/api/settings", async (HttpRequest req, IMediator mediator, UpdateSettingCommand command) =>
        {
            return await mediator.Send(command);
        })
        .WithName(nameof(UpdateSetting))
        .WithTags("Settings")
        .ProducesValidationProblem()
        .Produces<Result>(StatusCodes.Status200OK);
    }

    public record UpdateSettingCommand() : IRequest<IResult>
    {
        public string? Theme { get; set; } = "Light";
        public List<GetSettingsModel> Settings { get; set; } = new List<GetSettingsModel>();
        public List<SexModel> Sexes { get; set; } = new List<SexModel>();

        public List<BrandModel> Brands { get; set; } = new List<BrandModel>();
    };

    public record GetSettingsResponse()
    {
        public string? Theme { get; set; } = "Light";
        public List<GetSettingsModel> Settings { get; set; } = new List<GetSettingsModel>();
        public List<SexModel> Sexes { get; set; } = new List<SexModel>();

        public List<BrandModel> Brands { get; set; } = new List<BrandModel>();
    };

    public record GetSettingsModel(int Id, string Name, string Description, string Value);
    public class UpdateSettingCommandHandler(AppDbContext context, IValidator<UpdateSettingCommand> validator) : IRequestHandler<UpdateSettingCommand, IResult>
    {
        public async Task<IResult> Handle(UpdateSettingCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Results.Ok(Result<Dictionary<string, string[]>>.Failure(
                    result.GetValidationProblems(),
                    new Error("Formula.ErrorValidation", "Se presentaron errores de validación")
                ));
            }

            var sexSettings = await context.Settings.Where(x => x.Name == "LIST_SEXES").FirstOrDefaultAsync();
            var ThemeSettings = await context.Settings.Where(x => x.Name == "THEME").FirstOrDefaultAsync();
            var brandsSettings = await context.Settings.Where(x => x.Name == "LIST_BRAND").FirstOrDefaultAsync();

            if (brandsSettings != null)
            {
                var brandsList = JsonSerializer.Serialize(request.Brands);
                brandsSettings.Update(brandsList);
            }

            if (sexSettings != null)
            {
                var sexList = JsonSerializer.Serialize(request.Sexes);
                sexSettings.Update(sexList);
            }

            if (ThemeSettings != null)
            {
                var themeValue = JsonSerializer.Serialize(request.Theme);
                ThemeSettings.Update(themeValue);
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

    public class UpdateSettingValidator : AbstractValidator<UpdateSettingCommand>
    {
        public UpdateSettingValidator()
        {
            RuleFor(x => x.Theme).NotEmpty();
            RuleFor(x => x.Settings).NotEmpty();
            RuleFor(x => x.Sexes).NotEmpty();
        }
    }
}