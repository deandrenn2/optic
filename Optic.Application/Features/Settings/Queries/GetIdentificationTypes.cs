using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.Settings;

public class GetIdentificationTypes : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/settings/identificationTypes", async (IMediator mediator) =>
        {
           return await mediator.Send(new GetIdentificationTypesQuery());
        })
        .WithName(nameof(GetIdentificationTypes))
        .WithTags("Settings")
        .Produces(StatusCodes.Status200OK); ;
    }

    public record GetIdentificationTypesResponse(int Id, int Orden, string Name, string Abbreviation);

    public record GetIdentificationTypesQuery : IRequest<Result>;

    public class GetIdentificationTypesQueryHandler(AppDbContext context) : IRequestHandler<GetIdentificationTypesQuery, Result>
    {

        public async Task<Result> Handle(GetIdentificationTypesQuery request, CancellationToken cancellationToken)
        {
            var identificationTypes = await context.IdentificationTypes.ToListAsync();
            var identificationTypeList = identificationTypes.Select(x => new GetIdentificationTypesResponse(
                x.Id,
                x.Orden,
                x.Name,
                x.Abbreviation               
                )).ToList();

            return Result<List<GetIdentificationTypesResponse>>.Success(identificationTypeList, "Tipos de identificación");
        }
    }
} 