using Carter;
using Carter.ModelBinding;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.formulas;
public class GetPagerFormulas : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/formulas/pager", async (HttpRequest req, IMediator mediator, int pageSize = 5, int pageIndex = 1) =>
        {
            return await mediator.Send(new GetPagerFormulasQuery(pageIndex, pageSize));
        })
        .WithName(nameof(GetPagerFormulas))
        .WithTags(nameof(Formula))
        .ProducesValidationProblem()
        .Produces<List<GetFormulaResponse>>(StatusCodes.Status200OK);

    }

    public record GetPagerFormulasQuery(int Page, int PageSize) : IRequest<IResult>;

    public record GetFormulaResponse
    {
        public int Id { get; set; }
        public int CodeNumber { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public decimal SumTotal { get; set; }
        public DateTime? UpdateDate { get; set; }
    }

    public class GetPagerFormulasQueryHandler(AppDbContext context, IValidator<GetPagerFormulasQuery> validator) : IRequestHandler<GetPagerFormulasQuery, IResult>
    {
        public async Task<IResult> Handle(GetPagerFormulasQuery request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);

            if (!result.IsValid)
            {
                var resultError = PagedResult<Dictionary<string, string[]>>.Failure(
                     result.GetValidationProblems(),
                     new Error("formula.ErrorValidation", "Se presentaron errores de validación"));

                return Results.Ok(resultError);
            }

            var formulas = await context.Formulas.Include(x => x.Invoice).Include(x => x.Client)
                .OrderByDescending(x => x.UpdateDate)
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize).ToListAsync();

            var formulasResponse = new List<GetFormulaResponse>();
            foreach (var formula in formulas)
            {
                var formulaResponse = new GetFormulaResponse
                {
                    Id = formula.Id,
                    CodeNumber = formula.Invoice.Number,
                    SumTotal = formula.Invoice.Total,
                    UpdateDate = formula.UpdateDate,
                    FullName = formula.Client.LastName + " " + formula.Client.FirstName,
                    LastName = formula.Client.LastName,
                    FirstName = formula.Client.FirstName,
                };
                formulasResponse.Add(formulaResponse);
            }

            var pager = PagedResult<List<GetFormulaResponse>>.Success(formulasResponse, "Lista formulaos");


            return Results.Ok(pager);
        }
    }

    public class GetPagerFormulasValidator : AbstractValidator<GetPagerFormulasQuery>
    {
        public GetPagerFormulasValidator()
        {
            RuleFor(x => x.Page).NotEmpty();
            RuleFor(x => x.PageSize).NotEmpty();
        }
    }
}
