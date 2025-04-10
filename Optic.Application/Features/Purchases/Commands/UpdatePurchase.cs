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

public class UpdatePurchase : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("api/purchases/{id}", async (int id, HttpRequest req, IMediator mediator, UpdatePurchaseCommand command) =>
        {
            return await mediator.Send(command);
        })
             .WithName(nameof(UpdatePurchase))
             .WithTags(nameof(Formula))
             .ProducesValidationProblem()
             .Produces<int>(StatusCodes.Status201Created);
    }

    public record UpdatePurchaseCommand : IRequest<IResult>
    {
        public int Id { get; init; }
        public int IdBusiness { get; init; }
        public int IdPurchase { get; init; }
        public int Number { get; init; }
        public string PaymentType { get; init; } = string.Empty;
        public int SupplierId { get; init; }
        public DateTime Date { get; init; } = DateTime.Now;
        public List<PurchaseDetailModel> Products { get; init; } = new();
        public decimal SumTotal { get; init; }
    }

    public class UpdatePurchaseHandler(AppDbContext context, IValidator<UpdatePurchaseCommand> validator) : IRequestHandler<UpdatePurchaseCommand, IResult>
    {
        public async Task<IResult> Handle(UpdatePurchaseCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Results.Ok(Result<Dictionary<string, string[]>>.Failure(
                    result.GetValidationProblems(),
                    new Error("Purchase.ErrorValidation", "Se presentaron errores de validación")
                ));
            }
            var purchase = await context.Purchases.FindAsync(request.IdPurchase);

            if (purchase == null || purchase == null)
                return Results.Ok(Result.Failure(new Error("Purchase.ErrorUpdatePurchase", "No se pudo actualizar la compra")));

            if (purchase.State != "Borrador")
                return Results.Ok(Result.Failure(new Error("Purchase.ErrorUpdatePurchase", "La compra no puede ser actualizada porque está en estado " + purchase.State)));


            purchase.Update(request.Number, request.PaymentType, request.Date, request.SumTotal, request.SupplierId);


            //Agregar detalles de la compra
            var products = await context.PurchaseDetails.Where(x => x.IdPurchase == purchase.Id).ToListAsync();
            var productsDelete = products.Where(x => !request.Products.Any(y => y.IdProduct == x.IdProduct)).ToList();
            purchase.RemoveDetail(productsDelete);
            foreach (var product in request.Products)
            {
                var detailFind = products.FirstOrDefault(x => x.IdProduct == product.IdProduct);
                if (detailFind == null)
                {
                    var newDetail = PurchaseDetail.Create(0, purchase.Id, product.IdProduct, product.Description, product.Price, product.Quantity, product.PriceSale);
                    purchase.AddDetail(newDetail);
                }
                else
                {
                    detailFind.Update(product.Description, product.Price, product.Quantity);
                }
            }

            var resCount = await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Results.Ok(Result<int>.Success(purchase.Id, "Compra actualizada correctamente"));
            }
            else
            {
                return Results.Ok(Result.Failure(new Error("Purchase.ErrorUpdatePurchase", "Error al actualizar la compra")));
            }

        }
    }
    public class UpdatePurchaseValidator : AbstractValidator<UpdatePurchaseCommand>
    {
        public UpdatePurchaseValidator()
        {
            RuleFor(x => x.IdPurchase).NotEmpty().GreaterThan(0);
            RuleFor(x => x.IdBusiness).NotEmpty().GreaterThan(0);
            RuleFor(x => x.Date).NotEmpty();
        }
    }
}