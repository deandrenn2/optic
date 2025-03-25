using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

public class GetHistoryClient : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/client/{id:int}/formulas", async (int id, IMediator mediator) =>
        {
            return await mediator.Send(new GetHistoryClientQuery(id));
        })
        .WithName(nameof(GetHistoryClient))
        .WithTags(nameof(Client))
        .ProducesValidationProblem()
        .Produces<List<FormulasResponse>>(StatusCodes.Status200OK);
    }

    public record GetHistoryClientQuery(int? IdClient) : IRequest<IResult>;

    public record FormulasResponse
    {
        public int Id { get; init; }
        public int IdBusiness { get; init; }
        public int? IdClient { get; init; }
        public string? ClientName { get; init; } = string.Empty;
        public string Description { get; init; } = string.Empty;
        public DateTime Date { get; init; } = DateTime.Now;
        public int Number { get; init; }
        public string State { get; init; } = string.Empty;

        public List<string> Tags { get; init; } = new();

        public List<DiagnosisModel> Diagnosis { get; init; } = new();
    }


    public class GetHistoryClientHandler(AppDbContext context) : IRequestHandler<GetHistoryClientQuery, IResult>
    {
        public async Task<IResult> Handle(GetHistoryClientQuery request, CancellationToken cancellationToken)
        {
            var formulas = await context.Formulas
                .Include(x => x.Client)
                .Include(x => x.Invoice)
                .Include(x => x.Tags)
                .Include(x => x.FormulaDiagnosis)
                .ThenInclude(x => x.Diagnosis)
                .Where(x => x.ClientId == request.IdClient)
                .ToListAsync();

            var formulasList = formulas.Select(x => new FormulasResponse
            {
                Id = x.Id,
                IdBusiness = x.BusinessId,
                IdClient = x.ClientId,
                ClientName = x.Client.LastName + " " + x.Client.FirstName,
                Description = x.Description,
                Date = x.Date,
                State = x.State,
                Number = x.Invoice?.Number ?? 0,
                Tags = x.Tags.Select(y => y.Name).ToList(),
                Diagnosis = x.FormulaDiagnosis.Select(y => new DiagnosisModel
                {
                    Id = y.IdDiagnostico,
                    Name = y.Diagnosis.Name,
                    Value = y.Value
                }).ToList(),
            }).ToList();

            if (formulas == null || formulas.Count == 0)
            {
                return Results.Ok(Result.Success("No hay formulas registradas"));
            }

            return Results.Ok(Result<List<FormulasResponse>>.Success(formulasList, "Formulas obtenidas correctamente"));

        }
    }
}