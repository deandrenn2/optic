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

namespace Optic.Application.Features.Purchases;
public class GetPagerPurchases : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/purchases/pager", async (HttpRequest req, IMediator mediator, int pageSize = 5, int pageIndex = 1) =>
        {
            return await mediator.Send(new GetPagerPurchasesQuery(pageIndex, pageSize));
        })
        .WithName(nameof(GetPagerPurchases))
        .WithTags(nameof(Purchase))
        .ProducesValidationProblem()
        .Produces<List<GetPurchaseResponse>>(StatusCodes.Status200OK);

    }

    public record GetPagerPurchasesQuery(int Page, int PageSize) : IRequest<IResult>;

    public record GetPurchaseResponse
    {
        public int Id { get; set; }
        public int CodeNumber { get; set; }
        public decimal SumTotal { get; set; }
        public DateTime? UpdateDate { get; set; }
    }

    public class GetPagerPurchasesQueryHandler(AppDbContext context, IValidator<GetPagerPurchasesQuery> validator) : IRequestHandler<GetPagerPurchasesQuery, IResult>
    {
        public async Task<IResult> Handle(GetPagerPurchasesQuery request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);

            if (!result.IsValid)
            {
                var resultError = PagedResult<Dictionary<string, string[]>>.Failure(
                     result.GetValidationProblems(),
                     new Error("Purchase.ErrorValidation", "Se presentaron errores de validación"));

                return Results.Ok(resultError);
            }

            var purchases = await context.Purchases
                .OrderBy(x => x.UpdateDate)
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize).ToListAsync();

            var purchasesResponse = new List<GetPurchaseResponse>();
            foreach (var purchase in purchases)
            {
                var purchaseResponse = new GetPurchaseResponse
                {
                    Id = purchase.Id,
                    CodeNumber = purchase.Number,
                    SumTotal = purchase.Total,
                    UpdateDate = purchase.UpdateDate,
                };
                purchasesResponse.Add(purchaseResponse);
            }

            var pager = PagedResult<List<GetPurchaseResponse>>.Success(purchasesResponse, "Lista de compras");


            return Results.Ok(pager);
        }
    }

    public class GetPagerPurchasesValidator : AbstractValidator<GetPagerPurchasesQuery>
    {
        public GetPagerPurchasesValidator()
        {
            RuleFor(x => x.Page).NotEmpty();
            RuleFor(x => x.PageSize).NotEmpty();
        }
    }
}
