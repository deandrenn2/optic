using Optic.Application.Domain.Primitives;

namespace Optic.Application.Domain.Entities;

internal class IdentificationTypes : AggregateRoot
{
    public IdentificationTypes(int id,
        int orden,
        string name) : base(id)
    {
        Orden = orden;
        Name = name;
    }

    public int Orden { get; private set; }
    public string Name { get; private set; }
}

