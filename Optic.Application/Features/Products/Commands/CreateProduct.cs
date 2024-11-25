using Carter;
using Carter.ModelBinding;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.Products.Commands;

public class CreateProduct : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/products", async (HttpRequest req, IMediator mediator, CreateProductCommand command) =>
        {
            return await mediator.Send(command);
        })
             .WithName(nameof(CreateProduct))
             .WithTags(nameof(Product))
             .ProducesValidationProblem()
             .Produces(StatusCodes.Status201Created);
    }

    public record CreateProductCommand : IRequest<Result>
    {
        public string Name { get; init; } = string.Empty;
        public int IdBrand { get; init; }
        public string CodeNumber { get; init; } = string.Empty;
        public string? BarCode { get; init; }
        public int Quantity { get; init; }
        public decimal UnitPrice { get; init; }
        public decimal SalePrice { get; init; }
        public int Stock { get; init; }
        public string? Image { get; init; }
    }

    public class CreateProductHandler(AppDbContext contex, IValidator<CreateProductCommand> validator) : IRequestHandler<CreateProductCommand, Result>
    {
        public async Task<Result> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Result<IResult>.Failure(Results.ValidationProblem(result.GetValidationProblems()), new Error("Product.ErrorValidation", "Se presentaron errores de validación"));
            }

            var product = Product.Create(0, request.IdBrand, request.Name, request.CodeNumber, request.Quantity, request.UnitPrice, request.SalePrice, request.Stock);

            contex.Add(product);

            var resCount = await contex.SaveChangesAsync();

            if (resCount > 0)
            {
                return Result<Product>.Success(product, "Producto creado correctamente");
            }
            else
            {
                return Result.Failure(new Error("Product.ErrorCreateProduct", "Error al crear el producto"));
            }

        }
    }

    public class CreateProductValidator : AbstractValidator<CreateProductCommand>
    {
        public CreateProductValidator()
        {
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

