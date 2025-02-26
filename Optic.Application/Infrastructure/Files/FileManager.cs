using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Optic.Domain.Shared;

namespace Optic.Application.Infrastructure.Files;

public class FileManager : IFileManager
{
    private readonly string _uploadPath;
    private readonly string[] _allowedExtensions = { ".jpg", ".jpeg", ".png" };
    private const long _maxSize = 5 * 1024 * 1024; // 5MB

    public FileManager(IWebHostEnvironment env)
    {
        // Almacenar archivos en wwwroot/static/logos/
        // Verifica si WebRootPath es null y usa un valor por defecto
        string webRootPath = env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");

        _uploadPath = Path.Combine(webRootPath, "static/logos");

        if (!Directory.Exists(_uploadPath))
        {
            Directory.CreateDirectory(_uploadPath);
        }
    }

    public async Task<Result> UploadFileAsync(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return Result.Failure(new Error("FileUpload.NotUploaded", "Archivo no subido"));

        var fileExtension = Path.GetExtension(file.FileName).ToLower();
        if (!_allowedExtensions.Contains(fileExtension))
            return Result.Failure(new Error("FileUpload.FormatNotAllowed", $"Formato no permitido. Solo .jpg, .jpeg y .png."));

        if (file.Length > _maxSize)
            return Result.Failure(new Error("FileUpload.SizeExceeded", $"El archivo excede los 5MB."));

        try
        {
            string uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";
            string filePath = Path.Combine(_uploadPath, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return Result.Success(uniqueFileName);
        }
        catch (Exception ex)
        {
            return Result.Failure(new Error("FileUpload.Error", $"Error interno: {ex.Message}"));
        }
    }
}