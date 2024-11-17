using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.Clients;
public class GetClients : ICarterModule
{
    public record GetClientsResponse(
        int Id,
        string FirstName,
        string LastName,
        int Sex,
        int IdentificationTypeId,
        string IdentificationNumber,
        string Email,
        string Address,
        string CellPhoneNumber,
        string PhoneNumber);

    public record GetClientsQuery() : IRequest<Result>;

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/clients", async (IMediator mediator) =>
        {
            return await mediator.Send(new GetClientsQuery());
        })
        .WithName(nameof(GetClients))
        .WithTags(nameof(Domain.Entities.Client))
        .Produces(StatusCodes.Status200OK);
    }

    public class GetBusinessHandler(AppDbContext context) : IRequestHandler<GetClientsQuery, Result>
    {
        public async Task<Result> Handle(GetClientsQuery request, CancellationToken cancellationToken)
        {
            var clients = await context.Clients.ToListAsync();

            var clientsList = clients.Select(x => new GetClientsResponse(
                x.Id,
                x.FirstName,
                x.LastName,
                x.Sex,
                x.IdentificationTypeId,
                x.IdentificationNumber,
                x.Email,
                x.Address,
                x.CellPhoneNumber,
                x.PhoneNumber
            )).ToList();

            if (clients == null)
            {
                return Result.Failure(new Error("User.ErrorData", "No existe una empreas creada"));
            }

            return Result<List<GetClientsResponse>>.Success(clientsList, "Datos de los clientes");
        }


    }
}

