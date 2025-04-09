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
        app.MapGet("api/products/pager", async (HttpRequest req, IMediator mediator, int pageSize = 5, int pageIndex = 1, bool? orderByName = false, string? search = null) =>
        {
            return await mediator.Send(new GetPagerProductsQuery(pageIndex, pageSize, orderByName, search));
        })
        .WithName(nameof(GetPagerProducts))
        .WithTags(nameof(Product))
        .ProducesValidationProblem()
        .Produces<PagedResultQuery<GetProductResponse>>(StatusCodes.Status200OK);

    }

    public record GetPagerProductsQuery(int Page, int PageSize, bool? OrderByName, string? Search) : IRequest<IResult>;

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

            var productsQuery = context.Products.Include(x => x.Categories).AsQueryable();

            if (request.OrderByName != null)
            {
                if (request.OrderByName == true)
                {
                    productsQuery = productsQuery.OrderBy(x => x.Name);
                }
                else
                {
                    productsQuery = productsQuery.OrderByDescending(x => x.UpdateDate);
                }
            }

            if (request.Search != null)
            {
                productsQuery = productsQuery.Where(x => x.Name.ToUpper().Contains(request.Search.ToUpper()) || x.CodeNumber.Contains(request.Search));
            }
            var productsQueryModel = productsQuery.Select(x => new GetProductResponse
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

            var products = await productsQueryModel.GetPagedAsync(request.Page, request.PageSize);

            return Results.Ok(products);
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
