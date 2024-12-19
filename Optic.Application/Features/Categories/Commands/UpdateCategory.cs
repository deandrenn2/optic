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

namespace Optic.Application.Features.Categories;
public class UpdateCategory : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("api/categories", async (HttpRequest req, IMediator mediator, UpdateCategoryCommand command) =>
        {
            return await mediator.Send(command);
        })
             .WithName(nameof(UpdateCategory))
             .WithTags(nameof(Category))
             .ProducesValidationProblem()
             .Produces(StatusCodes.Status201Created);
    }

    public record UpdateCategoryCommand : IRequest<Result>
    {
        public int Id { get; init; }
        public string Name { get; init; } = string.Empty;
    }

    public class UpdateCategoryHandler(AppDbContext context, IValidator<UpdateCategoryCommand> validator) : IRequestHandler<UpdateCategoryCommand, Result>
    {
        public async Task<Result> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Result<IResult>.Failure(Results.ValidationProblem(result.GetValidationProblems()), new Error("Category.ErrorValidation", "Se presentaron errores de validación"));
            }

            var category = await context.Categories.FindAsync(request.Id);

            if (category == null)
            {
                return Result.Failure(new Error("Category.NotFound", "Categoria no encontrada"));
            }

            category.Update(request.Name);

            var resCount = await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Result<Category>.Success(category, "Categoria actualizada correctamente");
            }
            else
            {
                return Result.Failure(new Error("Category.ErrorUpdateCategory", "Error al actualizar la categoria"));
            }
        }
    }

    public class UpdateCategoryValidator : AbstractValidator<UpdateCategoryCommand>
    {
        public UpdateCategoryValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Name).NotEmpty();
        }
    }
}