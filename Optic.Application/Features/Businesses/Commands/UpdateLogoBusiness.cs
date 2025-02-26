using Carter;
using Carter.ModelBinding;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Files;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Shared;

public class UpdateLogoBusiness : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/businesses/{id:int}", async (int id, HttpRequest req, IMediator mediator) =>
        {
            var form = await req.ReadFormAsync();
            var file = form.Files["file"];
            return await mediator.Send(new UpdateLogoBusinessCommand(file, id));
        })
        .WithName(nameof(UpdateLogoBusiness))
        .WithTags(nameof(Business))
        .Accepts<IFormFile>("multipart/form-data")
        .ProducesValidationProblem()
        .Produces<string>(StatusCodes.Status400BadRequest)
        .Produces(StatusCodes.Status201Created);
    }

    public record UpdateLogoBusinessCommand(IFormFile? File, int BusinessId) : IRequest<Result>;

    public class UpdateLogoBusinessHandler(AppDbContext context, IFileManager fileManager, IValidator<UpdateLogoBusinessCommand> validator) : IRequestHandler<UpdateLogoBusinessCommand, Result>
    {
        public async Task<Result> Handle(UpdateLogoBusinessCommand request, CancellationToken cancellationToken)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Result<IResult>.Failure(Results.ValidationProblem(result.GetValidationProblems()), new Error("Login.ErrorValidation", "Se presentaron errores de validación"));
            }

            var business = await context.Businesses.FindAsync(request.BusinessId);

            if (business == null)
            {
                return Result.Failure(new Error("Business.NotFound", "Business no encontrada"));
            }

            if (request.File == null)
            {
                return Result.Failure(new Error("Business.ErrorUploadFile", "Error al subir el archivo"));
            }

            var resFile = await fileManager.UploadFileAsync(request.File);

            if (resFile.IsFailure)
            {
                return Result.Failure(new Error("Business.ErrorUploadFile", "Error al subir el archivo"));
            }

            if (!string.IsNullOrEmpty(resFile.Message))
                business.UpdateLogo(resFile.Message);

            var resCount = await context.SaveChangesAsync();


            if (resCount > 0)
            {
                return Result.Success("Logo actualizado correctamente");
            }
            else
            {
                return Result.Failure(new Error("Business.ErrorUpdateLogo", "Error al actualizar el logo"));
            }
        }
    }

    public class UpdateLogoBussinessValidator : AbstractValidator<UpdateLogoBusinessCommand>
    {
        public UpdateLogoBussinessValidator()
        {
            RuleFor(x => x.BusinessId).NotEmpty();
        }
    }
}