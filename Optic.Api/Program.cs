using Carter;
using Optic.Application;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(c =>
{
    c.Title = "OPTIC Api";
    c.Version = "v1";
});

// Configurar DbContext con MediatR
builder.Services.AddApplicationCore();

// Configurar DbContext con SQLite
builder.Services.AddPersistence(builder.Configuration);

// Autorización y autenticación
builder.AddAutenticationServices();

// registro de servicios
builder.AddInfraestructure();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseOpenApi();
app.UseSwaggerUi(settings => { settings.Path = "/docs"; });
app.UseReDoc(settings =>
{
    settings.Path = "/redoc";
    settings.DocumentPath = "/swagger/v1/swagger.json";
});
app.UseAuthentication();
app.UseAuthorization();
app.MapCarter();
app.Run();

internal record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
