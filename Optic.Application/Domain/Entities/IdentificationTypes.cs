using Optic.Application.Domain.Primitives;

namespace Optic.Application.Domain.Entities;

public class IdentificationType : AggregateRoot
{
    public IdentificationType(int id,
        int orden,
        string name) : base(id)
    {
        Orden = orden;
        Name = name;
    }

    public int Orden { get; private set; }
    public string Name { get; private set; }
}

