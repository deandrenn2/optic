using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

public class GetFormula : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/formulas/{id:int}", async (int id, IMediator mediator) =>
        {
            return await mediator.Send(new GetFormulaQuery(id));
        })
        .WithName(nameof(GetFormula))
        .WithTags(nameof(Formula))
        .ProducesValidationProblem()
        .Produces<FormulaResponse>(StatusCodes.Status200OK);

    }

    public record GetFormulaQuery(int Id) : IRequest<IResult>;

    public record FormulaResponse
    {
        public int IdBusiness { get; init; }
        public int? IdClient { get; init; }
        public string ClientName { get; init; } = string.Empty;
        public string Description { get; init; } = string.Empty;
        public string State { get; init; } = string.Empty;
        public DateTime Date { get; init; } = DateTime.Now;

        public int IdInvoice { get; init; }

        public List<string> Tags { get; init; } = new();

        public List<DiagnosisModel> Diagnosis { get; init; } = new();

        public List<InvoiceDetailModel> Products { get; init; } = new();

        public decimal? PriceLens { get; init; }
        public decimal PriceConsultation { get; init; }

        public decimal? SumTotal
        {
            get
            {
                return PriceLens + PriceConsultation;
            }
        }
    }


    public class GetFormulaHandler(AppDbContext context) : IRequestHandler<GetFormulaQuery, IResult>
    {
        public async Task<IResult> Handle(GetFormulaQuery request, CancellationToken cancellationToken)
        {
            var formula = await context.Formulas
            .Include(x => x.Client)
            .Include(x => x.Tags)
            .Include(x => x.FormulaDiagnosis).ThenInclude(x => x.Diagnosis)
            .Include(x => x.Invoice)
            .Include(x => x.Invoice.InvoiceDetails)
            .ThenInclude(x => x.Product)
            .FirstOrDefaultAsync(x => x.Id == request.Id);

            if (formula == null)
            {

                return Results.Ok(Result.Failure(new Error("Formula.NotFound", "Formula no encontrada")));
            }

            var formulaResponse = new FormulaResponse
            {
                IdBusiness = formula.BusinessId,
                IdClient = formula.ClientId,
                ClientName = formula.Client.LastName + " " + formula.Client.FirstName,
                Description = formula.Description,
                IdInvoice = formula.Invoice.Id,
                State = formula.State,
                Date = formula.Date,
                Tags = formula.Tags.Select(y => y.Name).ToList(),
                Diagnosis = formula.FormulaDiagnosis.Select(y => new DiagnosisModel
                {
                    Id = y.IdDiagnostico,
                    Name = y.Diagnosis.Name,
                    Value = y.Value
                }).ToList(),
                Products = formula.Invoice.InvoiceDetails.Select(y => new InvoiceDetailModel
                {
                    Id = y.Id,
                    IdInvoice = y.IdInvoice,
                    IdProduct = y.IdProduct,
                    Description = y.Description,
                    Price = y.Price,
                    Quantity = y.Quantity,
                    ProductName = y.Product.Name,
                }).ToList(),
                PriceLens = formula.PriceLens,
                PriceConsultation = formula.PriceConsultation
            };

            return Results.Ok(Result<FormulaResponse>.Success(formulaResponse, "Formula obtenida correctamente"));
        }
    }
}