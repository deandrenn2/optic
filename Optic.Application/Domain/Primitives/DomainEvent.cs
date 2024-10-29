
namespace Optic.Application.Domain.Primitives;

public abstract record DomainEvent(Guid Id) : IDomainEvent;
