using System.Text.Json;
using Carter;
using Carter.ModelBinding;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain.Entities;
using Optic.Application.Domain.Models;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

public class UpdateSetting : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("/api/settings", async (HttpRequest req, IMediator mediator, UpdateSettingCommand command) =>
        {
            await mediator.Send(command);
        })
        .WithName(nameof(UpdateSetting))
        .WithTags("Settings")
        .ProducesValidationProblem()
        .Produces(StatusCodes.Status200OK);
    }

    public record UpdateSettingCommand() : IRequest<Result>
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
    public class UpdateSettingCommandHandler(AppDbContext context, IValidator<UpdateSettingCommand> validator) : IRequestHandler<UpdateSettingCommand, Result>
    {
        public async Task<Result> Handle(UpdateSettingCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Result<IResult>.Failure(Results.ValidationProblem(result.GetValidationProblems()), new Error("Product.ErrorValidation", "Se presentaron errores de validación"));
            }


            var settings = await context.Settings.ToListAsync();
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

            request.Settings.ForEach(x =>
            {
                var setting = settings.FirstOrDefault(s => s.Name == x.Name);
                if (setting != null)
                {
                    setting.Update(x.Description, x.Value);
                }
            });

            var response = new GetSettingsResponse();
            response.Settings = request.Settings;
            response.Theme = request.Theme;
            response.Sexes = request.Sexes;
            response.Brands = request.Brands;


            var resCount = await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Result<GetSettingsResponse>.Success(response, "Configuraciones actualizadas correctamente");
            }
            else
            {
                return Result.Failure(new Error("Setting.ErrorUpdateSetting", "Error al actualizar la configuración"));
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