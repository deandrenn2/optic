using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;


namespace Optic.Application.Features.Products;

public class GetValidateProduct : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/products/validate/{code}", async (IMediator mediator, string code, bool validateQuantity = true) =>
        {
            return await mediator.Send(new GetValidateProductQuery(code, validateQuantity));
        })
             .WithName(nameof(GetValidateProduct))
             .WithTags(nameof(Product))
             .ProducesValidationProblem()
             .Produces(StatusCodes.Status200OK);
    }

    public record GetValidateProductResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int IdBrand { get; set; }
        public string CodeNumber { get; set; } = string.Empty;
        public string? BarCode { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal SalePrice { get; set; }
        public int Stock { get; set; }
        public int? IdSupplier { get; set; }
        public string? Image { get; set; }
        public List<string> Categories { get; set; } = new();
    }

    public record GetValidateProductQuery(string Code, bool ValidateQuantity) : IRequest<Result>;

    public class GetValidateProductHandler(AppDbContext contex) : IRequestHandler<GetValidateProductQuery, Result>
    {
        public async Task<Result> Handle(GetValidateProductQuery request, CancellationToken cancellationToken)
        {
            var product = await contex.Products.FirstOrDefaultAsync(x => x.CodeNumber == request.Code);

            if (product == null)
            {
                return Result.Failure(new Error("Product.NotFound", "Producto no encontrado"));
            }

            if (request.ValidateQuantity && product.Quantity == 0)
            {
                return Result.Failure(new Error("Product.NoQuantity", "Producto no tiene cantidad"));
            }

            var productResponse = new GetValidateProductResponse
            {
                Id = product.Id,
                Name = product.Name,
                IdBrand = product.IdBrand,
                CodeNumber = product.CodeNumber,
                BarCode = product.BarCode,
                Quantity = product.Quantity,
                UnitPrice = product.UnitPrice,
                SalePrice = product.SalePrice,
                Stock = product.Stock,
                IdSupplier = product.IdSupplier,
                Image = product.Image,
                Categories = product.Categories.Select(x => x.Name).ToList()
            };

            return Result<GetValidateProductResponse>.Success(productResponse, "Producto encontrado");
        }
    }
}