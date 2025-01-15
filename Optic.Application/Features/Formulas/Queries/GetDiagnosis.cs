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
public class GetDiagnosis : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/diagnosis", async (IMediator mediator) =>
        {
            return await mediator.Send(new GetDiagnosisQuery());
        })
             .WithName(nameof(GetDiagnosis))
             .WithTags(nameof(Formula))
             .ProducesValidationProblem()
             .Produces<List<Diagnosis>>(StatusCodes.Status200OK);
    }

    public record GetDiagnosisQuery : IRequest<IResult>
    {
    }

    public class GetDiagnosisHandler(AppDbContext context) : IRequestHandler<GetDiagnosisQuery, IResult>
    {
        public async Task<IResult> Handle(GetDiagnosisQuery request, CancellationToken cancellationToken)
        {
            var diagnosis = await context.Diagnosis.ToListAsync();

            if (diagnosis == null || diagnosis.Count == 0)
            {
                return Results.Ok(Result.Success("No hay diagnosticos registrados"));
            }

            return Results.Ok(Result<List<Diagnosis>>.Success(diagnosis.Select(x => x).ToList(), "Diagnosis obtenidos correctamente"));
        }
    }
}