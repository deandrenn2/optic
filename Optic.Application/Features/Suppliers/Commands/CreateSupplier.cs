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

namespace Optic.Application.Features.Suppliers.Commands;
public class CreateSupplier : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/suppliers", async (HttpRequest req, IMediator mediator, CreateSupplierCommand command) =>
        {
            return await mediator.Send(command);
        })
        .WithName(nameof(CreateSupplier))
        .WithTags(nameof(Supplier))
        .ProducesValidationProblem()
        .Produces(StatusCodes.Status201Created);
    }

    public record CreateSupplierCommand : IRequest<Result>
    {
        public string Name { get; init; } = string.Empty;
        public string Nit { get; init; } = string.Empty;
        public string Address { get; init; } = string.Empty;
        public string Email { get; private set; } = string.Empty;
        public string CellPhoneNumber { get; init; } = string.Empty;
        public string PhoneNumber { get; private set; } = string.Empty;
    }

    public class CreateSupplierHandler(AppDbContext context, IValidator<CreateSupplierCommand> validator) : IRequestHandler<CreateSupplierCommand, Result>
    {
        async Task<Result> IRequestHandler<CreateSupplierCommand, Result>.Handle(CreateSupplierCommand request, CancellationToken cancellationToken)
        {
           var result = validator.Validate(request);
            if (!result.IsValid) {
                return Result<IResult>.Failure(Results.ValidationProblem(result.GetValidationProblems()), new Error("Supplier.ErrorValidation", "Se presentaron errores de validación"));
            }

            var supplier = new Supplier(0, request.Nit, request.Name, request.Address, request.CellPhoneNumber, request.PhoneNumber, request.Email);

            context.Add(supplier);

            var resCount =  await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Result<Supplier>.Success(supplier, "Proveedor creado correctamente");
            }
            else
            {
                return Result.Failure(new Error("Supplier.ErrorCreateSupplier", "Error al crear el proveedor"));
            }
        }
    }

    public class CreateSupplierValidator : AbstractValidator<CreateSupplierCommand>
    {
        public CreateSupplierValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Nit).NotEmpty();
            RuleFor(x => x.Address).NotEmpty();
            RuleFor(x => x.CellPhoneNumber).NotEmpty();
            RuleFor(x => x.Name).MinimumLength(2);
        }
    }
}
