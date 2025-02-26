using Microsoft.AspNetCore.Http;
using Optic.Domain.Shared;

namespace Optic.Application.Infrastructure.Files;
public interface IFileManager
{
    Task<Result> UploadFileAsync(IFormFile file);
}