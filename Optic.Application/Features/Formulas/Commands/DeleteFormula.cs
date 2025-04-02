using Carter;
using Carter.ModelBinding;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.Formulas;

public class DeleteFormula : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete("api/formulas/{id}", async (int id, IMediator mediator) =>
        {
            return await mediator.Send(new DeleteFormulaCommand { Id = id });
        })
             .WithName(nameof(DeleteFormula))
             .WithTags(nameof(Formula))
             .ProducesValidationProblem()
             .Produces<int>(StatusCodes.Status200OK);
    }

    public record DeleteFormulaCommand : IRequest<IResult>
    {
        public int Id { get; init; }
    }

    public class DeleteFormulaHandler(AppDbContext context, IValidator<DeleteFormulaCommand> validator) : IRequestHandler<DeleteFormulaCommand, IResult>
    {
        public async Task<IResult> Handle(DeleteFormulaCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Results.Ok(Result<IResult>.Failure(Results.ValidationProblem(result.GetValidationProblems()), new Error("Formula.ErrorValidation", "Se presentaron errores de validación")));
            }

            var formula = await context.Formulas.FindAsync(request.Id);

            if (formula == null)
            {
                return Results.Ok(Result.Failure(new Error("Formula.ErrorDelete", "No se encontró la formula")));
            }

            if (formula.State != "Borrador")
            {
                return Results.Ok(Result.Failure(new Error("Formula.ErrorDelete", "La formula solo se puede eliminar si está en estado borrador")));
            }

            context.Formulas.Remove(formula);

            var resCount = await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Results.Ok(Result<int>.Success(formula.Id, "Formula eliminada correctamente"));
            }
            else
            {
                return Results.Ok(Result.Failure(new Error("Formula.ErrorDelete", "Error al eliminar la formula")));
            }
        }
    }

    public class DeleteFormulaValidator : AbstractValidator<DeleteFormulaCommand>
    {
        public DeleteFormulaValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
        }
    }


}