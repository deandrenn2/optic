using MediatR;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Domain;
using Optic.Application.Domain.Entities;
using Optic.Application.Infrastructure.Sqlite.Configurations;

namespace Optic.Application.Infrastructure.Sqlite;
public class AppDbContext : DbContext
{
    private readonly IPublisher _publisher;

    public AppDbContext(DbContextOptions options, IPublisher publisher) : base(options)
    {
        this._publisher = publisher;
    }

    public DbSet<User> Users => Set<User>();


    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        try
        {
            var result = await base.SaveChangesAsync(cancellationToken);

                var events = ChangeTracker.Entries<IHasDomainEvent>()
                .Select(x => x.Entity.DomainEvents)
                .SelectMany(x => x)
                .Where(domainEvent => !domainEvent.IsPublished)
                .ToArray();

        foreach (var @event in events)
        {
            @event.IsPublished = true;

            //_logger.LogInformation("New domain event {Event}", @event.GetType().Name);

            // Note: If an unhandled exception occurs, all the saved changes will be rolled back
            // by the TransactionBehavior. All the operations related to a domain event finish
            // successfully or none of them do.
            // Reference: https://docs.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/domain-events-design-implementation#what-is-a-domain-event
            await _publisher.Publish(@event);
        }

        return result;
        }
        catch (Exception ex)
        {

            throw;
        }
       

    
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfiguration(new UserConfiguration());
    }

}

