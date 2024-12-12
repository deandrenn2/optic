using System.Security.Cryptography.X509Certificates;
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

public class CreateCategory : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/categories", async (HttpRequest req, IMediator mediator, CreateCategoryCommand command) =>
        {
            return await mediator.Send(command);
        })
             .WithName(nameof(CreateCategory))
             .WithTags(nameof(Category))
             .ProducesValidationProblem()
             .Produces(StatusCodes.Status201Created);
    }

    public record CreateCategoryCommand : IRequest<Result>
    {
        public string Name { get; init; } = string.Empty;

    }

    public class CreateCategoryHandler(AppDbContext context, IValidator<CreateCategoryCommand> validator) : IRequestHandler<CreateCategoryCommand, Result>
    {
        public async Task<Result> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Result<IResult>.Failure(Results.ValidationProblem(result.GetValidationProblems()), new Error("Category.ErrorValidation", "Se presentaron errores de validación"));
            }

            var categoryFind = await context.Categories.FirstOrDefaultAsync(x => x.Name.ToUpper() == request.Name.ToUpper());

            if (categoryFind != null)
            {
                return Result.Failure(new Error("Category.AlreadyExists", "La categoria ya existe"));
            }

            var maxNumber = await context.Categories.MaxAsync(x => x.Number);

            var category = new Category(0, maxNumber + 1, request.Name);

            var resCount = await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Result<Category>.Success(category, "Categoria creada correctamente");
            }
            else
            {
                return Result.Failure(new Error("Category.ErrorCreateCategory", "Error al crear la categoria"));
            }
        }
    }

    public class CreateCategoryValidator : AbstractValidator<CreateCategoryCommand>
    {
        public CreateCategoryValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
        }
    }
}