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
public class UpdateQuantity : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("api/products/quantity", async (HttpRequest req, IMediator mediator, UpdateQuantityCommand command) =>
        {
            return await mediator.Send(command);
        })
        .WithName(nameof(UpdateQuantity))
        .WithTags(nameof(Product))
        .ProducesValidationProblem()
        .Produces(StatusCodes.Status200OK);
    }

    public record UpdateQuantityCommand(int Id, int Quantity, bool IsIncrement) : IRequest<Result>;

    public class UpdateQuantityCommandHandler(AppDbContext context, IValidator<UpdateQuantityCommand> validator) : IRequestHandler<UpdateQuantityCommand, Result>
    {
        public async Task<Result> Handle(UpdateQuantityCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);

            if (!result.IsValid)
            {
                return Result<IResult>.Failure(Results.ValidationProblem(result.GetValidationProblems()), new Error("Product.ErrorValidation", "Se presentaron errores de validación"));
            }

            var product = await context.Products.FirstOrDefaultAsync(x => x.Id == request.Id);

            if (product == null)
            {
                return Result.Failure(new Error("Product.ErrorUpdateQuantity", "El producto no existe"));
            }

            int quantity = 0;
            if (request.IsIncrement)
                quantity = product.Quantity + request.Quantity;
            else if ((product.Quantity - request.Quantity) >= 0)
                quantity = product.Quantity - request.Quantity;

            product.UpdateQuantity(quantity);

            var resCount = await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Result<UpdateQuantityCommand>.Success(request, "Producto actualizado correctamente");
            }
            else
            {
                return Result.Failure(new Error("Product.ErrorUpdateQuantity", "Error al actualizar el producto"));
            }
        }
    }

    public class UpdateQuantityValidator : AbstractValidator<UpdateQuantityCommand>
    {
        public UpdateQuantityValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Quantity).NotEmpty();
        }
    }
}