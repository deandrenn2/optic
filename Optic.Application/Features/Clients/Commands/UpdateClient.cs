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

namespace Optic.Application.Features.Clients;

public class UpdateClients : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("api/clients", async (HttpRequest req, IMediator mediator, UpdateClientCommand command) =>
        {
            return await mediator.Send(command);
        })
        .WithName(nameof(UpdateClients))
        .WithTags(nameof(Client))
        .ProducesValidationProblem()
        .Produces(StatusCodes.Status201Created);
    }

    public record UpdateClientCommand : IRequest<Result>
    {
        public int Id { get; set; }
        public string FirstName { get; init; } = string.Empty;
        public string LastName { get; init; } = string.Empty;
        public int Sex { get; init; }
        public int IdentificationTypeId { get; init; }
        public string IdentificationNumber { get; init; } = string.Empty;
        public string Email { get; init; } = string.Empty;
        public string Address { get; init; } = string.Empty;
        public string CellPhoneNumber { get; init; } = string.Empty;
        public string PhoneNumber { get; init; } = string.Empty;
    }

    public class CreateClientHandler(AppDbContext context, IValidator<UpdateClientCommand> validator) : IRequestHandler<UpdateClientCommand, Result>
    {
        public async Task<Result> Handle(UpdateClientCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Result<IResult>.Failure(Results.ValidationProblem(result.GetValidationProblems()), new Error("Client.ErrorValidation", "Se presentaron errores de validación"));
            }

            var updateClient = await context.Clients.FirstOrDefaultAsync(x => x.Id == request.Id);

            if (updateClient == null)
            {
                return Result.Failure(new Error("Client.ErrorClientNoFound", "El cliente que intenta actualizar no existe"));
            }

            updateClient.Update(
                request.FirstName,
                request.LastName,
                request.Sex,
                request.IdentificationTypeId,
                request.IdentificationNumber,
                request.Email,
                request.Address,
                request.CellPhoneNumber,
                request.PhoneNumber
                );


            var resCount = await context.SaveChangesAsync();


            if (resCount > 0)
            {
                return Result<Client>.Success(updateClient, "Cliente actualizado correctamente");
            }
            else
            {
                return Result.Failure(new Error("Client.ErrorUpdateClient", "Error al actualizar el cliente"));
            }
        }
    }

    public class CreateClientValidator : AbstractValidator<UpdateClientCommand>
    {
        public CreateClientValidator()
        {
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();
            RuleFor(x => x.IdentificationNumber).NotEmpty();
            RuleFor(x => x.IdentificationTypeId).NotEmpty();
        }
    }
}

