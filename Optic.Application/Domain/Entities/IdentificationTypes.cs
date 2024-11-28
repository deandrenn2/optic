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
    //public List<Client> Clients { get; set; } = new List<Client>();

    public static IdentificationType Create(int id, int orden, string name)
    {
        return new IdentificationType(id, orden, name);
    }

    public void Update(int orden, string name) {
        Orden = orden;
        Name = name;
    }

}

