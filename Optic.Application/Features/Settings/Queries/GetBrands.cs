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

public class GetBrands : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/settings/brands", async (IMediator mediator) =>
        {
            return await mediator.Send(new GetBrandsQuery());
        })
        .WithName(nameof(GetBrands))
        .WithTags("Settings")
        .Produces<List<BrandModel>>(StatusCodes.Status200OK);
    }

    public record GetBrandsQuery() : IRequest<IResult>;
    public class GetBrandsQueryHandler(AppDbContext context) : IRequestHandler<GetBrandsQuery, IResult>
    {
        public async Task<IResult> Handle(GetBrandsQuery request, CancellationToken cancellationToken)
        {
            var brandsSettings = await context.Settings.Where(x => x.Name == "LIST_BRAND").FirstOrDefaultAsync();

            var brandsList = JsonSerializer.Deserialize<List<BrandModel>>(brandsSettings?.Value ?? "");
            if (brandsList == null)
                brandsList = new List<BrandModel>();


            return Results.Ok(Result<List<BrandModel>>.Success(brandsList, "Listado de configuraciones"));
        }
    }
}