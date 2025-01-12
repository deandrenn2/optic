using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

public class GetProduct : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/products/{id}", async (IMediator mediator, int id) =>
        {
            return await mediator.Send(new GetProductQuery(id));
        })
             .WithName(nameof(GetProduct))
             .WithTags(nameof(Product))
             .ProducesValidationProblem()
             .Produces(StatusCodes.Status200OK);
    }

    public record GetProductResponse
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

    public record GetProductQuery(int Id) : IRequest<Result>;

    public class GetProductHandler(AppDbContext contex) : IRequestHandler<GetProductQuery, Result>
    {
        public async Task<Result> Handle(GetProductQuery request, CancellationToken cancellationToken)
        {
            var product = await contex.Products.FindAsync(request.Id);

            if (product == null)
            {
                return Result.Failure(new Error("Product.NotFound", "Producto no encontrado"));
            }

            var productResponse = new GetProductResponse
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

            return Result<GetProductResponse>.Success(productResponse, "Producto encontrado");
        }
    }
}