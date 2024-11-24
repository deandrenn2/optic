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

namespace Optic.Application.Features.Suppliers.Commands;
public class DeleteSupplier : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete("api/suppliers/{idSupplier:int}", async (int idSupplier, IMediator mediator) =>
        {
            var command = new DeleteSupplierCommand { Id = idSupplier };
            return await mediator.Send(command);
        })
            .WithName(nameof(DeleteSupplier))
            .WithTags(nameof(Supplier))
            .ProducesValidationProblem()
            .Produces(StatusCodes.Status200OK);
    }

    public record DeleteSupplierCommand : IRequest<Result>
    {
        public int Id { get; set; }
    }

    public class DeleteSupplierHandler(AppDbContext context, IValidator<DeleteSupplierCommand> validator) : IRequestHandler<DeleteSupplierCommand, Result>
    {
        public async Task<Result> Handle(DeleteSupplierCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Result<IResult>.Failure(Results.ValidationProblem(result.GetValidationProblems()), new Error("Supplier.ErrorValidation", "Se presentaron errores de validación"));
            }

            var deleteSupplier = await context.Suppliers.FirstOrDefaultAsync(x => x.Id == request.Id);

            if ( deleteSupplier == null)
            {
                return Result.Failure(new Error("Supplier.ErrorSupplierNoFound", "El proveedor que intenta eliminar no existe"));
            }

            context.Remove(deleteSupplier);

            var  resCount =  await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Result<Supplier>.Success(deleteSupplier, "Proveedor eliminado correctamente");
            }  else
            {
                return Result.Failure(new Error("Supplier.ErrorDeleteSupplier", "Errror al eliminar un proveedor"));
            }

        }
    }

    public class DeleteSupplierValidator : AbstractValidator<DeleteSupplierCommand>
    {
        public DeleteSupplierValidator()
        {
            RuleFor(x => x.Id).NotEmpty();  
        }
    }
}

