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

namespace Optic.Application.Features.Sales;
public class UpdateSale : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("api/sales/{id}", async (int id, HttpRequest req, IMediator mediator, UpdateSaleCommand command) =>
        {
            return await mediator.Send(command);
        })
        .WithName(nameof(UpdateSale))
        .WithTags(nameof(Invoice))
        .ProducesValidationProblem()
        .Produces<int>(StatusCodes.Status201Created);
    }

    public record UpdateSaleCommand : IRequest<IResult>
    {
        public int Id { get; init; }
        public int Number { get; init; }
        public int? IdClient { get; init; }
        public DateTime Date { get; init; } = DateTime.Now;
        public string PaymentType { get; init; } = string.Empty;
        public decimal SumTotal { get; init; }
    }

    public class UpdateSaleHandler(AppDbContext context, IValidator<UpdateSaleCommand> validator) : IRequestHandler<UpdateSaleCommand, IResult>
    {
        public async Task<IResult> Handle(UpdateSaleCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Results.Ok(Result<Dictionary<string, string[]>>.Failure(
                    result.GetValidationProblems(),
                    new Error("Sale.ErrorValidation", "Se presentaron errores de validación")
                ));
            }
            var invoice = await context.Invoices.FindAsync(request.Id);

            if (invoice == null)
                return Results.Ok(Result.Failure(new Error("Sale.NotFound", "Sale no encontrada")));

            invoice.Update(request.Number, request.PaymentType, request.Date, request.SumTotal, request.IdClient);

            var resCount = await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Results.Ok(Result<int>.Success(invoice.Id, "Sale actualizada correctamente"));
            }
            else
            {
                return Results.Ok(Result.Failure(new Error("Sale.ErrorUpdateSale", "Error al actualizar la factura")));
            }

        }
    }
    public class UpdateSaleValidator : AbstractValidator<UpdateSaleCommand>
    {
        public UpdateSaleValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.PaymentType).NotEmpty();
            RuleFor(x => x.IdClient).NotEmpty().GreaterThan(0);
        }
    }
}