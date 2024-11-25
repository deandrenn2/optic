using Carter;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.Products.Queries;
public class GetProducts : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/products", async (IMediator mediator) =>
        {
            return await mediator.Send(new GetProductsQuery());
        })
             .WithName(nameof(GetProducts))
             .WithTags(nameof(Product))
             .ProducesValidationProblem()
             .Produces(StatusCodes.Status200OK);
    }

    public record GetProductsResponse
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
        public string? Image { get; set; }
    }

    public record GetProductsQuery() : IRequest<Result>;

    public class GetProductsHandler(AppDbContext contex) : IRequestHandler<GetProductsQuery, Result>
    {
        public async Task<Result> Handle(GetProductsQuery request, CancellationToken cancellationToken)
        {
            var products = await contex.Products.ToListAsync();

            var productsList = products.Select(x => new GetProductsResponse
            {
                Name = x.Name,
                IdBrand = x.IdBrand,
                CodeNumber = x.CodeNumber,
                BarCode = x.BarCode,
                Quantity = x.Quantity,
                UnitPrice = x.UnitPrice,
                SalePrice = x.SalePrice,
                Stock = x.Stock,
                Image = x.Image
            }).ToList();

            if (products == null || products.Count == 0)
            {
                return Result.Success("No productos registrados");
            }
            
            return Result<List<GetProductsResponse>>.Success(productsList, "Datos de los productos");
        }
    }
}

