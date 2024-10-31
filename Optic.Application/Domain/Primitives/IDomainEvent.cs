using MediatR;

namespace Optic.Application.Domain.Primitives;

public interface IDomainEvent : INotification
{
    public int Id { get; init;}
}
