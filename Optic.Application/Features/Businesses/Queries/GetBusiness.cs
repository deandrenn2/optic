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
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/businesses/{id:int}", async (IMediator mediator, int id) =>
        {
            return await mediator.Send(new GetBusinessesQuery(id));
        })
        .WithName(nameof(GetBusiness))
        .WithTags(nameof(Business))
        .Produces<GetBusinessResponse>(StatusCodes.Status200OK);
    }

    public record GetBusinessResponse(int Id, string CompanyName, string Abbreviation, string UrlLogo, string Nit, string Address, string CellPhoneNumber, string PhoneNumber, string City);

    public record GetBusinessesQuery(int Id) : IRequest<IResult>;
    public class GetBusinessHandler(AppDbContext context) : IRequestHandler<GetBusinessesQuery, IResult>
    {
        public async Task<IResult> Handle(GetBusinessesQuery request, CancellationToken cancellationToken)
        {
            var business = await context.Businesses.FirstOrDefaultAsync(x => x.Id == request.Id);

            if (business == null)
            {
                return Results.Ok(Result.Failure(new Error("Business.ErrorData", "No existe una empresa con ese id")));
            }

            var businessModel = new GetBusinessResponse(business.Id, business.CompanyName, business.Abbreviation, business.UrlLogo, business.Nit, business.Address, business.CellPhoneNumber, business.PhoneNumber, business.City);

            return Results.Ok(Result<GetBusinessResponse>.Success(businessModel, "Listado de empresas"));
        }
    }


}