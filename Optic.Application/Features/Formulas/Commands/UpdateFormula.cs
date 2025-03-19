using System.Numerics;
using System.Security.Cryptography.X509Certificates;
using Carter;
using Carter.ModelBinding;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using Optic.Application.Domain.Entities;
using Optic.Application.Domain.Enums;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.Formulas;

public class UpdateFormulas : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("api/formulas/{id}", async (int id, HttpRequest req, IMediator mediator, UpdateFormulaCommand command) =>
        {
            return await mediator.Send(command);
        })
             .WithName(nameof(UpdateFormulas))
             .WithTags(nameof(Formula))
             .ProducesValidationProblem()
             .Produces<int>(StatusCodes.Status201Created);
    }

    public record UpdateFormulaCommand : IRequest<IResult>
    {
        public int Id { get; init; }
        public int IdBusiness { get; init; }
        public int? IdClient { get; init; }
        public int IdInvoice { get; init; }
        public string Description { get; init; } = string.Empty;
        public DateTime Date { get; init; } = DateTime.Now;

        public List<string> Tags { get; init; } = new();

        public List<DiagnosisModel> Diagnosis { get; init; } = new();

        public List<InvoiceDetailModel> Products { get; init; } = new();

        public decimal? PriceLens { get; init; }
        public decimal PriceConsultation { get; init; }

        public decimal SumTotal { get; init; }
    }

    public class UpdateFormulasHandler(AppDbContext context, IValidator<UpdateFormulaCommand> validator) : IRequestHandler<UpdateFormulaCommand, IResult>
    {
        public async Task<IResult> Handle(UpdateFormulaCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Results.Ok(Result<Dictionary<string, string[]>>.Failure(
                    result.GetValidationProblems(),
                    new Error("Formula.ErrorValidation", "Se presentaron errores de validación")
                ));
            }
            var formula = await context.Formulas.Include(x => x.Tags).FirstOrDefaultAsync(x => x.Id == request.Id);
            var invoice = await context.Invoices.FindAsync(request.IdInvoice);

            if (formula == null || invoice == null)
                return Results.Ok(Result.Failure(new Error("Formula.ErrorUpdateFormula", "No se pudo actualizar la formula")));

            if (formula.State != "Borrador")
                return Results.Ok(Result.Failure(new Error("Formula.ErrorUpdateFormula", "La formula no puede ser actualizada porque está en estado " + formula.State)));


            formula.Update(request.Description, request.Date, request.PriceLens.Value, request.PriceConsultation);

            //Agregar tags
            formula.RemoveTag(formula.Tags);
            foreach (var tag in request.Tags)
            {
                var tagFind = await context.Tags.FirstOrDefaultAsync(x => x.Name == tag);
                if (tagFind == null)
                {
                    var newTag = new Tags(0, tag);
                    formula.AddTag(newTag);
                }
                else
                {
                    formula.AddTag(tagFind);
                }
            }

            //agregar diagnosis
            foreach (var diagnosis in request.Diagnosis)
            {
                var diagnosisFind = await context.FormulaDiagnosis.Where(x => x.IdDiagnostico == diagnosis.Id && x.IdFormula == formula.Id).FirstOrDefaultAsync();

                if (diagnosis.stateChange == DataStateChange.Deleted && diagnosisFind != null)
                {
                    formula.RemoveDiagnosis(diagnosisFind);
                    continue;
                }

                if (diagnosisFind != null)
                {
                    diagnosisFind.Update(diagnosis.Value);
                }
                else
                {
                    var newDiagnosis = new FormulaDiagnosis(0, diagnosis.Id, formula.Id, diagnosis.Value);
                    formula.AddDiagnosis(newDiagnosis);
                }
            }

            //Agregar detalles de la factura
            var products = await context.InvoiceDetails.Where(x => x.IdInvoice == invoice.Id).ToListAsync();
            var productsDelete = products.Where(x => !request.Products.Any(y => y.IdProduct == x.IdProduct)).ToList();
            invoice.RemoveDetail(productsDelete);
            foreach (var product in request.Products)
            {
                var detailFind = products.FirstOrDefault(x => x.IdProduct == product.IdProduct);
                if (detailFind == null)
                {
                    var newDetail = InvoiceDetail.Create(0, invoice.Id, product.IdProduct, product.Description, product.Price, product.Quantity);
                    invoice.AddDetail(newDetail);
                }
                else
                {
                    detailFind.Update(product.Description, product.Price, product.Quantity);
                }
            }

            var resCount = await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Results.Ok(Result<int>.Success(formula.Id, "Formula actualizada correctamente"));
            }
            else
            {
                return Results.Ok(Result.Failure(new Error("Formula.ErrorUpdateFormula", "Error al actualizar la formula")));
            }

        }
    }
    public class UpdateFormulasValidator : AbstractValidator<UpdateFormulaCommand>
    {
        public UpdateFormulasValidator()
        {
            RuleFor(x => x.IdInvoice).NotEmpty().GreaterThan(0);
            RuleFor(x => x.IdBusiness).NotEmpty().GreaterThan(0);
            RuleFor(x => x.IdInvoice).NotEmpty().GreaterThan(0);
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.PriceConsultation).NotEmpty();
            RuleFor(x => x.IdClient).NotEmpty().GreaterThan(0);
        }
    }
}