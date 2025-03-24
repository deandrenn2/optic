using Carter;
using Carter.ModelBinding;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.Products;
public class GetPagerStockProducts : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/products/pager/stock", async (HttpRequest req, IMediator mediator, int pageSize = 5, int pageIndex = 1) =>
        {
            return await mediator.Send(new GetPagerStockProductsQuery(pageIndex, pageSize));
        })
        .WithName(nameof(GetPagerStockProducts))
        .WithTags(nameof(Product))
        .ProducesValidationProblem()
        .Produces<List<GetProductResponse>>(StatusCodes.Status200OK);

    }

    public record GetPagerStockProductsQuery(int Page, int PageSize) : IRequest<IResult>;

    public record GetProductResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string CodeNumber { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal SalePrice { get; set; }
        public int Stock { get; set; }
        public DateTime? UpdateDate { get; set; }
    }

    public class GetPagerStockProductsQueryHandler(AppDbContext context, IValidator<GetPagerStockProductsQuery> validator) : IRequestHandler<GetPagerStockProductsQuery, IResult>
    {
        public async Task<IResult> Handle(GetPagerStockProductsQuery request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);

            if (!result.IsValid)
            {
                var resultError = PagedResult<Dictionary<string, string[]>>.Failure(
                     result.GetValidationProblems(),
                     new Error("Product.ErrorValidation", "Se presentaron errores de validación"));

                return Results.Ok(resultError);
            }

            var products = await context.Products.Include(x => x.Categories)
                .OrderBy(x => x.UpdateDate).Where(x => x.Stock <= x.Quantity)
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize).ToListAsync();

            var productsResponse = new List<GetProductResponse>();
            foreach (var product in products)
            {
                var productResponse = new GetProductResponse
                {
                    Id = product.Id,
                    Name = product.Name,
                    CodeNumber = product.CodeNumber,
                    Quantity = product.Quantity,
                    UnitPrice = product.UnitPrice,
                    SalePrice = product.SalePrice,
                    Stock = product.Stock,
                    UpdateDate = product.UpdateDate,
                };
                productsResponse.Add(productResponse);
            }

            var pager = PagedResult<List<GetProductResponse>>.Success(productsResponse, "Lista Productos");


            return Results.Ok(pager);
        }
    }

    public class GetPagerStockProductsValidator : AbstractValidator<GetPagerStockProductsQuery>
    {
        public GetPagerStockProductsValidator()
        {
            RuleFor(x => x.Page).NotEmpty();
            RuleFor(x => x.PageSize).NotEmpty();
        }
    }
}
