using System.Text.Json.Nodes;
using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;
using System.Text.Json;
using Optic.Application.Domain;

namespace Optic.Application.Features.Settings;

public class GetSettings : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/settings", async (IMediator mediator) =>
        {
            return await mediator.Send(new GetSettingsQuery());
        })
        .WithName(nameof(GetSettings))
        .WithTags("Settings")
        .Produces(StatusCodes.Status200OK);
    }

    public record GetSettingsResponse()
    {
        public string? Theme { get; set; } = "Light";
        public bool IsEnabledBarcode { get; set; } = false;
        public List<GetSettingsModel> Settings { get; set; } = new List<GetSettingsModel>();
        public List<SexModel> Sexes { get; set; } = new List<SexModel>();
    };

    public record GetSettingsModel(int Id, string Name, string Description, string Value);
    public record GetSettingsQuery() : IRequest<Result>;
    public class GetSettingsQueryHandler(AppDbContext context) : IRequestHandler<GetSettingsQuery, Result>
    {
        public async Task<Result> Handle(GetSettingsQuery request, CancellationToken cancellationToken)
        {
            var modelConfig = new GetSettingsResponse();
            var settings = await context.Settings.ToListAsync();
            var sexSettings = await context.Settings.Where(x => x.Name == "LIST_SEXES").FirstOrDefaultAsync();
            var ThemeSettings = await context.Settings.Where(x => x.Name == "THEME").FirstOrDefaultAsync();
            var barcodeSettings = await context.Settings.Where(x => x.Name == "ENABLED_BARCODE").FirstOrDefaultAsync();

            var sexList = JsonSerializer.Deserialize<List<SexModel>>(sexSettings?.Value);
            var settingList = settings.Select(x => new GetSettingsModel(
                x.Id,
                x.Name,
                x.Description,
                x.Value
                )).ToList();


            modelConfig.Settings.AddRange(settingList);
            modelConfig.Theme = ThemeSettings?.Value;
            modelConfig.IsEnabledBarcode = barcodeSettings?.Value == "true";

            if (sexList != null)
                modelConfig.Sexes.AddRange(sexList);


            return Result<GetSettingsResponse>.Success(modelConfig, "Listado de configuraciones");
        }
    }
}