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

            var productsCount = 0;

            productsCount = await context.Products.Where(x => x.Quantity <= x.Stock).CountAsync();


            var products = context.Products.Include(x => x.Categories)
                .Where(x => x.Quantity <= x.Stock)
                .OrderBy(x => x.UpdateDate)
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize);



            var productsQueryModel = products.Select(x => new GetProductResponse
            {
                Id = x.Id,
                Name = x.Name,
                CodeNumber = x.CodeNumber,
                Quantity = x.Quantity,
                UnitPrice = x.UnitPrice,
                SalePrice = x.SalePrice,
                Stock = x.Stock,
                UpdateDate = x.UpdateDate,
            });


            var productsResult = await productsQueryModel.GetPagedAsync(request.Page, request.PageSize);

            return Results.Ok(productsResult);
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
