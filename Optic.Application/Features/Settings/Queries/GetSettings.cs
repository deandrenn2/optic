using System.Text.Json.Nodes;
using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain.Models;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;
using System.Text.Json;

namespace Optic.Application.Features.Settings;

public class GetSettings : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/settings", async (IMediator mediator) =>
        {
            await mediator.Send(new GetSettingsQuery());
        })
        .WithName(nameof(GetSettings))
        .WithTags("Settings")
        .Produces(StatusCodes.Status200OK);
    }

    public record GetSettingsResponse()
    {
        public string? Theme { get; set; } = "Light";
        public List<GetSettingsModel> Settings { get; set; } = new List<GetSettingsModel>();
        public List<SexModel> Sex { get; set; } = new List<SexModel>();
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
            var sexList = JsonSerializer.Deserialize<List<SexModel>>(sexSettings?.Value);
            var settingList = settings.Select(x => new GetSettingsModel(
                x.Id,
                x.Name,
                x.Description,
                x.Value
                )).ToList();

            modelConfig.Settings.AddRange(settingList);
            if (sexList != null)
                modelConfig.Sex.AddRange(sexList);
            modelConfig.Theme = ThemeSettings?.Value;

            return Result<GetSettingsResponse>.Success(modelConfig, "Listado de configuraciones");
        }
    }
}