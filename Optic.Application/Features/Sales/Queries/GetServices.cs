
using Carter;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.Sales;

public class GetServices : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/sales/{id:int}/services", async (int id, IMediator mediator) =>
        {
            return await mediator.Send(new GetServicesRequest(id));
        })
        .WithName(nameof(GetServices))
        .WithTags(nameof(Invoice))
        .ProducesValidationProblem()
        .Produces<List<ServicesModel>>(StatusCodes.Status200OK);
    }

    public record GetServicesRequest(int InvoiceId) : IRequest<IResult>;

    public record GetServicesResponse(List<ServicesModel> Services);

    public class GetServicesHandler(AppDbContext context) : IRequestHandler<GetServicesRequest, IResult>
    {
        public async Task<IResult> Handle(GetServicesRequest request, CancellationToken cancellationToken)
        {
            var services = await context.InvoiceServices.Where(x => x.IdInvoice == request.InvoiceId).ToListAsync();

            if (services.Count == 0)
            {
                return Results.Ok(Result.Failure(new Error("Sale.ErrorGetServices", "No se encontraron servicios para la factura")));
            }

            var servicesResponse = new List<ServicesModel>();

            foreach (var service in services)
            {
                var serviceResponse = new ServicesModel
                {
                    Id = service.Id,
                    InvoiceId = service.IdInvoice,
                    Description = service.Description,
                    Price = service.Price,
                };

                servicesResponse.Add(serviceResponse);
            }

            return Results.Ok(Result<GetServicesResponse>.Success(new GetServicesResponse(servicesResponse), "OK"));
        }
    }

    public class GetServicesValidator : AbstractValidator<GetServicesRequest>
    {
        public GetServicesValidator()
        {
            RuleFor(x => x.InvoiceId).NotEmpty();
        }
    }
}