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
public class AddServices : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/sales/{id:int}/services", async (int id, HttpRequest req, IMediator mediator, AddServicesCommand command) =>
        {
            return await mediator.Send(command);
        })
        .WithName(nameof(AddServices))
        .WithTags(nameof(Invoice))
        .ProducesValidationProblem()
        .Produces<int>(StatusCodes.Status201Created);
    }

    public record AddServicesCommand(int InvoiceId, decimal Price, string Description) : IRequest<IResult>;

    public class AddServicesHandler(AppDbContext context, IValidator<AddServicesCommand> validator) : IRequestHandler<AddServicesCommand, IResult>
    {
        public async Task<IResult> Handle(AddServicesCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Results.Ok(Result<Dictionary<string, string[]>>.Failure(
                    result.GetValidationProblems(),
                    new Error("Sale.ErrorValidation", "Se presentaron errores de validación")
                ));
            }

            var invoice = await context.Invoices.FindAsync(request.InvoiceId);

            if (invoice == null)
            {
                return Results.Ok(Result.Failure(new Error("Sale.ErrorAddServices", "No se encontró la factura")));
            }

            var newService = InvoiceService.Create(0, request.InvoiceId, request.Description, request.Price);

            invoice.AddService(newService);

            var resCount = await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Results.Ok(Result<int>.Success(invoice.Id, "Servicios creados correctamente"));
            }
            else
            {
                return Results.Ok(Result.Failure(new Error("Sale.ErrorAddServices", "Error al crear los servicios")));
            }
        }
    }

    public class AddServicesValidator : AbstractValidator<AddServicesCommand>
    {
        public AddServicesValidator()
        {
            RuleFor(x => x.InvoiceId).NotEmpty();
            RuleFor(x => x.Price).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
        }
    }
}