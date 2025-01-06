using Carter;
using Carter.ModelBinding;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain.Entities;
using Optic.Application.Features.Products.Commands;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.Products.Command;
public class UpdateProduct : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("api/products", async (HttpRequest req, IMediator mediator, UpdateProductCommand command) =>
        {
            return await mediator.Send(command);
        })
             .WithName(nameof(UpdateProduct))
             .WithTags(nameof(Product))
             .ProducesValidationProblem()
             .Produces(StatusCodes.Status200OK);
    }

    public record UpdateProductCommand : IRequest<Result>
    {
        public int Id { get; init; }
        public string Name { get; init; } = string.Empty;
        public int IdBrand { get; init; }
        public string CodeNumber { get; init; } = string.Empty;
        public string? BarCode { get; init; }
        public int Quantity { get; init; }
        public decimal UnitPrice { get; init; }
        public decimal SalePrice { get; init; }
        public int Stock { get; init; }
        public int IdSupplier { get; init; }
        public string? Image { get; init; }

        public List<string> Categories { get; init; } = new();
    }

    public class UpdateProductHandler(AppDbContext context, IValidator<UpdateProductCommand> validator) : IRequestHandler<UpdateProductCommand, Result>
    {
        public async Task<Result> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Result<IResult>.Failure(Results.ValidationProblem(result.GetValidationProblems()), new Error("Product.ErrorValidation", "Se presentaron errores de validación"));
            }

            var updateProduct = await context.Products.Include(x => x.Categories).FirstOrDefaultAsync(x => x.Id == request.Id);

            if (updateProduct == null)
            {
                return Result.Failure(new Error("Product.ErrorProductNoFound", "El producto que intenta actualizar no existe"));
            }

            updateProduct.Update(request.IdBrand, request.Name, request.CodeNumber, request.Quantity, request.UnitPrice, request.SalePrice, request.Stock, request.BarCode);

            //Agregar categorias

            foreach (var category in request.Categories)
            {
                var categoryProduct = updateProduct.Categories.FirstOrDefault(x => x.Name.ToUpper() == category.ToUpper());

                if (categoryProduct == null)
                {
                    var categoryFind = await context.Categories.FirstOrDefaultAsync(x => x.Name.ToUpper() == category.ToUpper());

                    if (categoryFind == null)
                    {
                        var newCategory = Category.Create(category);

                        updateProduct.AddCategory(newCategory);
                    }
                    else
                    {
                        updateProduct.AddCategory(categoryFind);
                    }

                }
            }

            var resCount = await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Result.Success("Producto actualizado correctamente");
            }
            else
            {
                return Result.Failure(new Error("Product.ErrorUpdateProduct", "Error al actualizar el producto"));
            }

        }
    }

    public class UpdateProductValidator : AbstractValidator<UpdateProductCommand>
    {
        public UpdateProductValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.IdBrand).NotEmpty();
            RuleFor(x => x.CodeNumber).NotEmpty();
            RuleFor(x => x.Quantity).NotEmpty();
            RuleFor(x => x.UnitPrice).NotEmpty();
            RuleFor(x => x.SalePrice).NotEmpty();
            RuleFor(x => x.Stock).NotEmpty();
        }
    }
}
