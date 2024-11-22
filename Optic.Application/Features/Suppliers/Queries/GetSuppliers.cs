using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

namespace Optic.Application.Features.Suppliers.Queries;
public class GetSuppliers : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/suppliers", async (IMediator mediator) =>
        {
            return await mediator.Send(new GetSuppliersQuery());
        })
        .WithName(nameof(GetSuppliers))
        .WithTags(nameof(Domain.Entities.Supplier))
        .Produces(StatusCodes.Status200OK);
    }

    public record GetSuppliersResponse(
        int Id,
        string Name,
        string Nit,
        string Address,
        string CellPhoneNumber,
        string PhoneNumber,
        string Email
    );

    public record GetSuppliersQuery() : IRequest<Result>;

    public class GetSuppliersHandler(AppDbContext context) : IRequestHandler<GetSuppliersQuery, Result>
    {
        public async Task<Result> Handle(GetSuppliersQuery request, CancellationToken cancellationToken)
        {
            var suppliers = await context.Suppliers.ToListAsync();

            var supplierList = suppliers.Select(x => new GetSuppliersResponse(
                x.Id,
                x.Name,
                x.Nit,
                x.Address,
                x.CellPhoneNumber,
                x.PhoneNumber,
                x.Email
                )).ToList();

            if (suppliers.Count() == 0)
            {
                return Result.Success("No existen proveedores");
            }
            else {
                return Result<List<GetSuppliersResponse>>.Success(supplierList, "Datos de los proveedores");
            }
        }
    }

}

