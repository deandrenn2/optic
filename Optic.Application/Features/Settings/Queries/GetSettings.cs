using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

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

    public record GetSettingsResponse(int Id, string Name, string Description, string Value);

    public record GetSettingsQuery() : IRequest<Result>;

    public class GetSettingsQueryHandler(AppDbContext context) : IRequestHandler<GetSettingsQuery, Result>
    {
        public async Task<Result> Handle(GetSettingsQuery request, CancellationToken cancellationToken)
        {
            var settings = await context.Settings.ToListAsync();

            var settingList = settings.Select(x => new GetSettingsResponse(
                x.Id,
                x.Name,
                x.Description,
                x.Value
                )).ToList();

            return Result<List<GetSettingsResponse>>.Success(settingList, "Listado de configuraciones");
        }
    }
}