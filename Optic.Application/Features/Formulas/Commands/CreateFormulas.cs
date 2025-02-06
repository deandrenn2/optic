using System.Numerics;
using Carter;
using Carter.ModelBinding;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain.Entities;
using Optic.Application.Domain.Enums;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.Formulas;

public class CreateFormulas : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/formulas", async (HttpRequest req, IMediator mediator, CreateFormulasCommand command) =>
        {
            return await mediator.Send(command);
        })
             .WithName(nameof(CreateFormulas))
             .WithTags(nameof(Formula))
             .ProducesValidationProblem()
             .Produces<int>(StatusCodes.Status201Created);
    }

    public record CreateFormulasCommand : IRequest<IResult>
    {
        public int? Id { get; init; }
        public int IdBusiness { get; init; }
        public int? IdClient { get; init; }
        public string Description { get; init; } = string.Empty;
        public DateTime Date { get; init; } = DateTime.Now;

        public List<string> Tags { get; init; } = new();

        public List<DiagnosisModel> Diagnosis { get; init; } = new();

        public List<InvoiceDetailModel> Products { get; init; } = new();

        public decimal? PriceLens { get; init; }
        public decimal PriceConsultation { get; init; }

        public decimal SumTotal { get; init; }
    }

    public class CreateFormulasHandler(AppDbContext context, IValidator<CreateFormulasCommand> validator) : IRequestHandler<CreateFormulasCommand, IResult>
    {
        public async Task<IResult> Handle(CreateFormulasCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Results.Ok(Result<Dictionary<string, string[]>>.Failure(
                    result.GetValidationProblems(),
                    new Error("Formula.ErrorValidation", "Se presentaron errores de validación")
                ));
            }

            int invoiceMaxNumber = 0;

            var count = await context.Invoices.CountAsync();

            if (count > 0)
                invoiceMaxNumber = await context.Invoices.MaxAsync(x => x.Number);

            var invoice = Invoice.Create(0, invoiceMaxNumber + 1, request.Date, request.SumTotal, "Borrador", "Contado", request.IdBusiness, request.IdClient);

            var formula = Formula.Create(0, request.Description, request.Date, "Borrador", request.PriceConsultation, request?.PriceLens ?? 0);



            //Agregar tags
            foreach (var tag in request.Tags)
            {
                var tagFind = await context.Tags.Where(x => x.Name == tag).FirstOrDefaultAsync();

                if (tagFind != null)
                {
                    formula.AddTag(tagFind);
                }
                else
                {
                    var newTag = new Tags(0, tag);

                    formula.AddTag(newTag);
                }
            }

            //agregar diagnosis
            foreach (var diagnosis in request.Diagnosis)
            {

                var newDiagnosis = new FormulaDiagnosis(0, diagnosis.Id, formula.Id, diagnosis.Value);

                formula.AddDiagnosis(newDiagnosis);

            }

            //Add Invoice
            formula.AddInvoice(invoice);

            //Agregar detalles de la factura
            foreach (var product in request.Products)
            {
                var newDetail = InvoiceDetail.Create(0, invoice.Id, product.IdProduct, product.Description, product.Price, product.Quantity);

                invoice.AddDetail(newDetail);
            }

            //Add Client and Business
            if (request.IdClient != null)
                formula.AddClient(request.IdClient.Value);

            formula.AddBusiness(request.IdBusiness);


            context.Add(formula);

            var resCount = await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Results.Ok(Result<int>.Success(formula.Id, "Formula creada correctamente"));
            }
            else
            {
                return Results.Ok(Result.Failure(new Error("Formula.ErrorCreateFormula", "Error al crear la formula")));
            }

        }
    }
    public class CreateFormulasValidator : AbstractValidator<CreateFormulasCommand>
    {
        public CreateFormulasValidator()
        {
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.PriceConsultation).NotEmpty();
            RuleFor(x => x.IdClient).NotEmpty().GreaterThan(0);
        }
    }
}