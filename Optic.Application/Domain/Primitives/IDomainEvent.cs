using MediatR;

namespace Optic.Application.Domain.Primitives;

public interface IDomainEvent : INotification
{
    public Guid Id { get; init;}
}
