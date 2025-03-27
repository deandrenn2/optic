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

namespace Optic.Application.Features.clients;
public class GetPagerClients : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/clients/pager", async (HttpRequest req, IMediator mediator, int pageSize = 5, int pageIndex = 1) =>
        {
            return await mediator.Send(new GetPagerClientsQuery(pageIndex, pageSize));
        })
        .WithName(nameof(GetPagerClients))
        .WithTags(nameof(Client))
        .ProducesValidationProblem()
        .Produces<List<GetClientResponse>>(StatusCodes.Status200OK);

    }

    public record GetPagerClientsQuery(int Page, int PageSize) : IRequest<IResult>;

    public record GetClientResponse
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string IdentificationType { get; set; } = string.Empty;
        public string IdentificationAbbreviation { get; set; } = string.Empty;
        public string IdentificationNumber { get; set; } = string.Empty;
        public int Sex { get; set; }
        public DateTime? UpdateDate { get; set; }
    }

    public class GetPagerClientsQueryHandler(AppDbContext context, IValidator<GetPagerClientsQuery> validator) : IRequestHandler<GetPagerClientsQuery, IResult>
    {
        public async Task<IResult> Handle(GetPagerClientsQuery request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);

            if (!result.IsValid)
            {
                var resultError = PagedResult<Dictionary<string, string[]>>.Failure(
                     result.GetValidationProblems(),
                     new Error("client.ErrorValidation", "Se presentaron errores de validación"));

                return Results.Ok(resultError);
            }

            var clients = await context.Clients.Include(x => x.IdentificationType)
                .OrderByDescending(x => x.UpdateDate)
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize).ToListAsync();

            var clientsResponse = new List<GetClientResponse>();
            foreach (var client in clients)
            {
                var productResponse = new GetClientResponse
                {
                    Id = client.Id,
                    FullName = client.FirstName + " " + client.LastName,
                    LastName = client.LastName,
                    FirstName = client.FirstName,
                    UpdateDate = client.UpdateDate,
                    IdentificationNumber = client.IdentificationNumber,
                    IdentificationType = client.IdentificationType.Name,
                    IdentificationAbbreviation = client.IdentificationType.Abbreviation,
                    Sex = client.Sex,
                };
                clientsResponse.Add(productResponse);
            }

            var pager = PagedResult<List<GetClientResponse>>.Success(clientsResponse, "Lista de clientes");


            return Results.Ok(pager);
        }
    }

    public class GetPagerClientsValidator : AbstractValidator<GetPagerClientsQuery>
    {
        public GetPagerClientsValidator()
        {
            RuleFor(x => x.Page).NotEmpty();
            RuleFor(x => x.PageSize).NotEmpty();
        }
    }
}
