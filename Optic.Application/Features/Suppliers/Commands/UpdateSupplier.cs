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

public class UpdateSupplier: ICarterModule
{

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("api/suppliers", async (HttpRequest req, IMediator mediator, UpdateSupplierCommand command) =>
        {
            return await mediator.Send(command);
        })
        .WithName(nameof(UpdateSupplier))
        .WithTags(nameof(Supplier))
        .ProducesValidationProblem()
        .Produces(StatusCodes.Status200OK);
    }

    public record UpdateSupplierCommand : IRequest<Result>
    {
        public int Id { get; set; }
        public string Name { get; init; } = string.Empty;
        public string Nit { get; init; } = string.Empty;
        public string Address { get; init; } = string.Empty;
        public string Email { get; private set; } = string.Empty;
        public string CellPhoneNumber { get; init; } = string.Empty;
        public string PhoneNumber { get; private set; } = string.Empty;
    }

    public class UpdateSupplierHandler(AppDbContext context, IValidator<UpdateSupplierCommand> validator) : IRequestHandler<UpdateSupplierCommand, Result>
    {
        async Task<Result> IRequestHandler<UpdateSupplierCommand, Result>.Handle(UpdateSupplierCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Result<IResult>.Failure(Results.ValidationProblem(result.GetValidationProblems()), new Error("Supplier.ErrorValidation", "Se presentaron errores de validación"));
            }

            var supplier = await context.Suppliers.FirstOrDefaultAsync(x => x.Id == request.Id);


            if (supplier == null)
            {
                return Result.Failure(new Error("Supplier.ErrorSupplierNoFound", "El proveedor que intenta actualizar no existe"));
            }

            supplier.Update(request.Name, request.Nit, request.Address, request.CellPhoneNumber, request.PhoneNumber, request.Email);

            int resCount = 0;
            try
            {

            resCount = await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {

            }

            if (resCount > 0)
            {
                return Result<Supplier>.Success(supplier, "Proveedor actualizado correctamente");
            }
            else
            {
                return Result.Failure(new Error("Supplier.ErrorUpdateSupplier", "Error al actualizar el proveedor"));
            }
        }
    }

    public class UpdateSupplierValidator : AbstractValidator<UpdateSupplierCommand>
    {
        public UpdateSupplierValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Nit).NotEmpty();
            RuleFor(x => x.Address).NotEmpty();
            RuleFor(x => x.CellPhoneNumber).NotEmpty();
            RuleFor(x => x.Name).MinimumLength(2);
        }
    }
}

