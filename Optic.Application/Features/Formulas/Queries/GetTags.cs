using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.Formulas;
public class GetTags : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/tags", async (IMediator mediator) =>
        {
            return await mediator.Send(new GetTagsFormulasQuery());
        })
             .WithName(nameof(GetTags))
             .WithTags(nameof(Formula))
             .ProducesValidationProblem()
             .Produces(StatusCodes.Status200OK);
    }

    public record GetTagsFormulasQuery : IRequest<Result>
    {
    }

    public class GetTagsFormulasHandler(AppDbContext context) : IRequestHandler<GetTagsFormulasQuery, Result>
    {
        public async Task<Result> Handle(GetTagsFormulasQuery request, CancellationToken cancellationToken)
        {
            var tags = await context.Tags.ToListAsync();

            if (tags == null || tags.Count == 0)
            {
                return Result.Success("No tags registradas");
            }
            return Result<List<Tags>>.Success(tags.Select(x => x).ToList(), "Tags obtenidos correctamente");
        }
    }
}