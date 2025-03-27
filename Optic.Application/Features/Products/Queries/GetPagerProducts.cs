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
public class GetPagerProducts : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/products/pager", async (HttpRequest req, IMediator mediator, int pageSize = 5, int pageIndex = 1) =>
        {
            return await mediator.Send(new GetPagerProductsQuery(pageIndex, pageSize));
        })
        .WithName(nameof(GetPagerProducts))
        .WithTags(nameof(Product))
        .ProducesValidationProblem()
        .Produces<List<GetProductResponse>>(StatusCodes.Status200OK);

    }

    public record GetPagerProductsQuery(int Page, int PageSize) : IRequest<IResult>;

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

    public class GetPagerProductsQueryHandler(AppDbContext context, IValidator<GetPagerProductsQuery> validator) : IRequestHandler<GetPagerProductsQuery, IResult>
    {
        public async Task<IResult> Handle(GetPagerProductsQuery request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);

            if (!result.IsValid)
            {
                var resultError = PagedResult<Dictionary<string, string[]>>.Failure(
                     result.GetValidationProblems(),
                     new Error("Product.ErrorValidation", "Se presentaron errores de validación"));

                return Results.Ok(resultError);
            }

            var countProduct = await context.Products.CountAsync();

            var products = await context.Products.Include(x => x.Categories)
                .OrderByDescending(x => x.UpdateDate)
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

            var pager = PagedResult<List<GetProductResponse>>.Success(productsResponse, "Lista Productos", countProduct);


            return Results.Ok(pager);
        }
    }

    public class GetPagerProductsValidator : AbstractValidator<GetPagerProductsQuery>
    {
        public GetPagerProductsValidator()
        {
            RuleFor(x => x.Page).NotEmpty();
            RuleFor(x => x.PageSize).NotEmpty();
        }
    }
}
