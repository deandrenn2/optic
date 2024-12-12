using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

class GetCategories : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/categories", async (HttpRequest req, IMediator mediator, GetCategoriesQuery query) =>
        {
            return await mediator.Send(query);
        })
             .WithName(nameof(GetCategories))
             .WithTags(nameof(Category))
             .ProducesValidationProblem()
             .Produces(StatusCodes.Status201Created);
    }

    public record GetCategoriesResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }

    public record GetCategoriesQuery : IRequest<Result<List<GetCategoriesResponse>>>
    {

    }

    public class GetCategoriesHandler(AppDbContext context) : IRequestHandler<GetCategoriesQuery, Result>
    {
        public async Task<Result> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
        {
            var categories = await context.Categories.ToListAsync();

            var categoriesList = categories.Select(x => new GetCategoriesResponse
            {
                Id = x.Id,
                Name = x.Name
            }).ToList();

            if (categories == null || categories.Count == 0)
            {
                return Result.Success("No categorias registradas");
            }

            return Result<List<GetCategoriesResponse>>.Success(categoriesList, "Categorias obtenidas correctamente");
        }
    }
}