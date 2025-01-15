using System.Text.Json.Serialization;

namespace Optic.Application.Domain.Primitives;

public abstract class AggregateRoot : Entity
{
    private List<IDomainEvent> _domainEvents = new List<IDomainEvent>();

    [JsonIgnore]
    public IReadOnlyCollection<IDomainEvent> DomainEvents => _domainEvents.ToList();
    public AggregateRoot(int id) : base(id)
    {

    }

    public void AddDomainEvent(IDomainEvent domainEvent)
    {
        _domainEvents.Add(domainEvent);
    }

    public void ClearDomainEvents()
    {
        _domainEvents.Clear();
    }
}
