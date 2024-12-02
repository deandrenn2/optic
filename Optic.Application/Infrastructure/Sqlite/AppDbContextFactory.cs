using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using MediatR;

namespace Optic.Application.Infrastructure.Sqlite;

public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{

    public AppDbContext CreateDbContext(string[] args)
    {
        // Asumiendo que el appsettings.json está en el proyecto Optic.Application.API
        var path = Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory())?.FullName ?? "", "Optic.Api");

        // Construye la configuración desde appsettings.json
        IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(path)
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .Build();

        var connectionString = configuration.GetConnectionString("SqliteConn");

        var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
        optionsBuilder.UseSqlite(connectionString);  // Ajusta según tu base de datos

        // Si no necesitas la funcionalidad real de IPublisher para las migraciones, puedes pasar una instancia dummy
        var dummyPublisher = new DummyPublisher();

        return new AppDbContext(optionsBuilder.Options, dummyPublisher);
    }
}

public class DummyPublisher : IPublisher
{
    public Task Publish<TNotification>(TNotification notification, CancellationToken cancellationToken = default)
        where TNotification : INotification
    {
        return Task.CompletedTask;  // Implementación vacía para tiempo de diseño
    }

    public Task Publish(object notification, CancellationToken cancellationToken = default)
    {
        return Task.CompletedTask;  // Implementación vacía
    }
}