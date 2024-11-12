using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.Businesses;
public class GetBusiness : ICarterModule
{
    public record GetBusinessResponse(int Id, string CompanyName, string Abbreviation, string Nit, string Address, string CellPhoneNumber, string PhoneNumber);

    public record GetBuniessQuery() : IRequest<Result>;

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/businesses", async ( IMediator mediator) =>
        {
            return await mediator.Send(new GetBuniessQuery());
        })
        .WithName(nameof(GetBusiness))
        .WithTags(nameof(Business))
        .Produces(StatusCodes.Status200OK);
    }

    public class GetBusinessHandler(AppDbContext context) : IRequestHandler<GetBuniessQuery, Result>
    {
        public async Task<Result> Handle(GetBuniessQuery request, CancellationToken cancellationToken)
        {
            var busines = await context.Businesses.FirstOrDefaultAsync();

            if (busines == null)
            {
                return Result.Failure(new Error("User.ErrorData", "No existe una empreas creada"));
            }

            return Result<GetBusinessResponse>.Success(
                new GetBusinessResponse(
                    busines.Id,
                    busines.CompanyName,
                    busines.Abbreviation,
                    busines.UrlLogo,
                    busines.PhoneNumber,
                    busines.CellPhoneNumber,
                    busines.Address), "Datos de la empresa");
        }


    }
}

