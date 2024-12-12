using Optic.Application.Domain.Primitives;

namespace Optic.Application.Domain.Entities;

public class IdentificationType : AggregateRoot
{
    public IdentificationType(int id,
        int orden,
        string name,
        string abbreviation) : base(id)
    {
        Orden = orden;
        Name = name;
        Abbreviation = abbreviation;
    }

    public int Orden { get; private set; }
    public string Name { get; private set; }
    public string Abbreviation { get; set; }
    public List<Client> Clients { get; set; } = new List<Client>();

    public void Update(int orden, string name, string abbreviation)
    {
        Orden = orden;
        Name = name;
        Abbreviation = abbreviation;
    }

}

