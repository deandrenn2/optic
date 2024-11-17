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

public class DeleteClients : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete("api/clients/{idCliente:int}", async (int idCliente, IMediator mediator) =>
        {
            var command = new DeleteClientCommand { Id = idCliente};
            return await mediator.Send(command);
        })
        .WithName(nameof(DeleteClients))
        .WithTags(nameof(Client))
        .ProducesValidationProblem()
        .Produces(StatusCodes.Status201Created);
    }

    public record DeleteClientCommand : IRequest<Result>
    {
        public int Id { get; init; }

    }

    public class DeleteClientHandler(AppDbContext context, IValidator<DeleteClientCommand> validator) : IRequestHandler<DeleteClientCommand, Result>
    {
        public async Task<Result> Handle(DeleteClientCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Result<IResult>.Failure(Results.ValidationProblem(result.GetValidationProblems()), new Error("Client.ErrorValidation", "Se presentaron errores de validación"));
            }

            var delClient = await context.Clients.FirstOrDefaultAsync(x => x.Id == request.Id);

            if (delClient == null)
            {
                return Result.Failure(new Error("Client.ErrorClientNoFound", "El cliente que intenta eliminar no existe"));
            }

            context.Remove(delClient);

            var resCount = await context.SaveChangesAsync();


            if (resCount > 0)
            {
                return Result<Client>.Success(delClient, "Cliente elinado correctamente");
            }
            else
            {
                return Result.Failure(new Error("Client.ErrorCreateClient", "Error al eliminar el cliente"));
            }
        }
    }

    public class DeleteClientValidator : AbstractValidator<DeleteClientCommand>
    {
        public DeleteClientValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
        }
    }
}

