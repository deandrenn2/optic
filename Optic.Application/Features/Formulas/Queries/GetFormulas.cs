using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

public class GetFormulas : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/formulas", async (IMediator mediator) =>
        {
            return await mediator.Send(new GetFormulasQuery());
        })
        .WithName(nameof(GetFormulas))
        .WithTags(nameof(Formula))
        .ProducesValidationProblem()
        .Produces(StatusCodes.Status200OK);
    }

    public record GetFormulasQuery : IRequest<IResult>;

    public record FormulasResponse
    {
        public int Id { get; init; }
        public int IdBusiness { get; init; }
        public int? IdClient { get; init; }
        public string? ClientName { get; init; } = string.Empty;
        public string Description { get; init; } = string.Empty;
        public DateTime Date { get; init; } = DateTime.Now;
        public decimal? PriceLens { get; init; }
        public int Number { get; init; }
        public string State { get; init; } = string.Empty;
        public decimal? PriceConsultation { get; init; }

        public decimal? SumTotal
        {
            get
            {
                return PriceLens + PriceConsultation;
            }
        }
    }


    public class GetFormulasHandler(AppDbContext context) : IRequestHandler<GetFormulasQuery, IResult>
    {
        public async Task<IResult> Handle(GetFormulasQuery request, CancellationToken cancellationToken)
        {
            var formulas = await context.Formulas.Include(x => x.Client).Include(x => x.Invoice).OrderByDescending(x => x.Invoice.Number).ToListAsync();

            var formulasList = formulas.Select(x => new FormulasResponse
            {
                Id = x.Id,
                IdBusiness = x.BusinessId,
                IdClient = x.ClientId,
                ClientName = x.Client.LastName + " " + x.Client.FirstName,
                Description = x.Description,
                Date = x.Date,
                PriceLens = x.PriceLens,
                PriceConsultation = x.PriceConsultation,
                State = x.State,
                Number = x.Invoice?.Number ?? 0,
            }).ToList();

            if (formulas == null || formulas.Count == 0)
            {
                return Results.Ok(Result.Success("No formulas registradas"));
            }

            return Results.Ok(Result<List<FormulasResponse>>.Success(formulasList, "Formulas obtenidas correctamente"));

        }
    }
}