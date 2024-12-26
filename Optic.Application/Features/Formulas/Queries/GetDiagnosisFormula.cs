using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.Formulas;

public class GetDiagnosisFormula : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/formulas/{id:int}/diagnosis", async (int id, IMediator mediator) =>
        {
            return await mediator.Send(new GetDiagnosisFormulaQuery { Id = id });
        })
             .WithName(nameof(GetDiagnosisFormula))
             .WithTags(nameof(Formula))
             .ProducesValidationProblem()
             .Produces(StatusCodes.Status200OK);
    }

    public record GetDiagnosisFormulaQuery : IRequest<Result>
    {
        public int Id { get; init; }
    }

    public class GetDiagnosisFormulaHandler(AppDbContext context) : IRequestHandler<GetDiagnosisFormulaQuery, Result>
    {
        public async Task<Result> Handle(GetDiagnosisFormulaQuery request, CancellationToken cancellationToken)
        {
            var formula = await context.Formulas.FindAsync(request.Id);

            if (formula == null)
            {
                return Result.Failure(new Error("Formula.NotFound", "Formula no encontrada"));
            }

            return Result<List<FormulaDiagnosis>>.Success(formula.FormulaDiagnosis, "Diagnosis obtenidos correctamente");
        }
    }
}