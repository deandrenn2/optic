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
public class AddCategories : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/products/{id}/categories", async (HttpRequest req, IMediator mediator, AddCategoriesCommand command) =>
        {
            return await mediator.Send(command);
        })
             .WithName(nameof(AddCategories))
             .WithTags(nameof(Product))
             .ProducesValidationProblem()
             .Produces(StatusCodes.Status201Created);
    }

    public record CategoryModel
    {
        public string Name { get; set; } = string.Empty;
    }

    public record AddCategoriesCommand : IRequest<Result>
    {
        public int Id { get; init; }
        public List<CategoryModel> Categories { get; init; } = new();
    }

    public class AddCategoriesHandler(AppDbContext context, IValidator<AddCategoriesCommand> validator) : IRequestHandler<AddCategoriesCommand, Result>
    {
        public async Task<Result> Handle(AddCategoriesCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Result<IResult>.Failure(Results.ValidationProblem(result.GetValidationProblems()), new Error("Product.ErrorValidation", "Se presentaron errores de validación"));
            }

            var product = await context.Products.FindAsync(request.Id);

            if (product == null)
            {
                return Result.Failure(new Error("Product.NotFound", "Producto no encontrado"));
            }

            foreach (var category in request.Categories)
            {
                var categoryFind = await context.Categories.FirstOrDefaultAsync(x => x.Name.ToUpper() == category.Name.ToUpper());

                if (categoryFind != null)
                {
                    product.AddCategory(categoryFind);
                }
                else
                {

                    var newCategory = Category.Create(category.Name);

                    product.AddCategory(newCategory);
                }
            }

            context.Add(product);

            var resCount = await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Result<Product>.Success(product, "Categoria agregada correctamente");
            }
            else
            {
                return Result.Failure(new Error("Product.ErrorCreateProduct", "Error al agregar la categoria al producto"));
            }

        }
    }

    public class AddCategoriesValidator : AbstractValidator<AddCategoriesCommand>
    {
        public AddCategoriesValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Categories).NotEmpty();
        }
    }
}