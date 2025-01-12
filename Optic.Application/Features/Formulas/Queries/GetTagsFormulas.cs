using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.Formulas;
public class GetTagsFormulas : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/formulas/{id:int}/tags", async (int id, IMediator mediator) =>
        {
            return await mediator.Send(new GetTagsQuery { Id = id });
        })
             .WithName(nameof(GetTagsFormulas))
             .WithTags(nameof(Formula))
             .ProducesValidationProblem()
             .Produces(StatusCodes.Status200OK);
    }

    public record GetTagsQuery : IRequest<Result>
    {
        public int Id { get; init; }
    }

    public class GetTagsHandler(AppDbContext context) : IRequestHandler<GetTagsQuery, Result>
    {
        public async Task<Result> Handle(GetTagsQuery request, CancellationToken cancellationToken)
        {
            var formula = await context.Formulas.FindAsync(request.Id);

            if (formula == null)
            {
                return Result.Failure(new Error("Formula.NotFound", "Formula no encontrada"));
            }

            return Result<List<Tags>>.Success(formula.Tags, "Tags obtenidos correctamente");
        }
    }
}