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

public class UpdateSetting: ICarterModule   
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("/api/settings", async (HttpRequest req,  IMediator mediator, UpdateSettingCommand command) =>
        {
            await mediator.Send(command);
        })
        .WithName(nameof(UpdateSetting))
        .WithTags("Settings")
        .ProducesValidationProblem()
        .Produces(StatusCodes.Status200OK);
    }

    public record UpdateSettingCommand(int Id, string Name, string Description, string Value) : IRequest<Result>;

    public class UpdateSettingCommandHandler(AppDbContext context, IValidator<UpdateSettingCommand> validator) : IRequestHandler<UpdateSettingCommand, Result>
    {
        public async Task<Result> Handle(UpdateSettingCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Result<IResult>.Failure(Results.ValidationProblem(result.GetValidationProblems()), new Error("Product.ErrorValidation", "Se presentaron errores de validación"));
            }

            var setting = await context.Settings.FirstOrDefaultAsync(x => x.Id == request.Id);

            if (setting == null)
            {
                return Result.Failure(new Error("Setting.ErrorSettingNoFound", "El tipo de identificación que intenta actualizar no existe"));
            }

            setting.Update(request.Name, request.Description, request.Value);

            var resCount = await context.SaveChangesAsync();

            if (resCount > 0)
            {
                return Result<Setting>.Success(setting, "Tipo de identificación actualizado correctamente");
            }
            else
            {
                return Result.Failure(new Error("Setting.ErrorUpdateSetting", "Error al actualizar el tipo de identificación"));
            }
        }
    }

    public class UpdateSettingValidator : AbstractValidator<UpdateSettingCommand>
    {
        public UpdateSettingValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Value).NotEmpty();
        }
    }
}