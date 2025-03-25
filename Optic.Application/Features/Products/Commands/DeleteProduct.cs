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

public class DeleteProduct : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete("api/products/{idProduct:int}", async (int idProduct, IMediator mediator) =>
        {
            return await mediator.Send(new DeleteProductCommand { Id = idProduct });
        })
             .WithName(nameof(DeleteProduct))
             .WithTags(nameof(Product))
             .ProducesValidationProblem()
             .Produces(StatusCodes.Status200OK);
    }

    public record DeleteProductCommand : IRequest<Result>
    {
        public int Id { get; init; }
    }

    public class UpdateProductHandler(AppDbContext contex, IValidator<DeleteProductCommand> validator) : IRequestHandler<DeleteProductCommand, Result>
    {
        public async Task<Result> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Result<IResult>.Failure(Results.ValidationProblem(result.GetValidationProblems()), new Error("Product.ErrorValidation", "Se presentaron errores de validación"));
            }

            var product = await contex.Products.FirstOrDefaultAsync(x => x.Id == request.Id);

            if (product == null)
            {
                return Result.Failure(new Error("Product.ErrorProductNoFound", "El producto que intenta eliminar no existe"));
            }

            contex.Remove(product);

            var resCount = await contex.SaveChangesAsync();

            if (resCount > 0)
            {
                return Result<Product>.Success(product, "Producto eliminado correctamente");
            }
            else
            {
                return Result.Failure(new Error("Product.ErrorDeleteProduct", "Error al eliminar el producto"));
            }

        }
    }

    public class DeleteProductValidator : AbstractValidator<DeleteProductCommand>
    {
        public DeleteProductValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
        }
    }
}

