using Carter;
using Carter.ModelBinding;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.Purchases;

public class CreatePurchase : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/purchases", async (HttpRequest req, IMediator mediator, CreatePurchaseCommand command) =>
        {
            return await mediator.Send(command);
        })
             .WithName(nameof(CreatePurchase))
             .WithTags(nameof(Purchase))
             .ProducesValidationProblem()
             .Produces<int>(StatusCodes.Status201Created);
    }

    public record CreatePurchaseCommand : IRequest<IResult>
    {
        public int? Id { get; init; }
        public int IdBusiness { get; init; }
        public int SupplierId { get; init; }
        public string PaymentType { get; init; } = string.Empty;
        public DateTime Date { get; init; } = DateTime.Now;
        public List<PurchaseDetailModel> Products { get; init; } = new List<PurchaseDetailModel>();

        public decimal SumTotal { get; init; }
    }

    public class CreatePurchaseHandler(AppDbContext context, IValidator<CreatePurchaseCommand> validator) : IRequestHandler<CreatePurchaseCommand, IResult>
    {
        public async Task<IResult> Handle(CreatePurchaseCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Results.Ok(Result<Dictionary<string, string[]>>.Failure(
                    result.GetValidationProblems(),
                    new Error("Purchase.ErrorValidation", "Se presentaron errores de validación")
                ));
            }

            int purchaseMaxNumber = 0;

            var count = await context.Purchases.CountAsync();

            if (count > 0)
                purchaseMaxNumber = await context.Purchases.MaxAsync(x => x.Number);

            var status = request.PaymentType == "Contado" ? "Pagada" : "Crédito";

            var purchase = Purchase.Create(0, purchaseMaxNumber + 1, request.Date, request.SumTotal, status, request.PaymentType, request.IdBusiness, request.SupplierId);


            //Agregar detalles de la factura
            foreach (var product in request.Products)
            {
                var newDetail = PurchaseDetail.Create(0, purchase.Id, product.IdProduct, product.Description, product.Price, product.Quantity);

                purchase.AddDetail(newDetail);
            }


            context.Add(purchase);

            var resCount = await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Results.Ok(Result<int>.Success(purchase.Id, "Compra creada correctamente"));
            }
            else
            {
                return Results.Ok(Result.Failure(new Error("Purchase.ErrorCreateFormula", "Error al realizar la compra")));
            }

        }
    }
    public class CreatePurchaseValidator : AbstractValidator<CreatePurchaseCommand>
    {
        public CreatePurchaseValidator()
        {
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.SupplierId).NotEmpty().GreaterThan(0);
            RuleFor(x => x.PaymentType).NotEmpty();

        }
    }
}