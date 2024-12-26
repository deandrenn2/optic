using Optic.Application.Domain.Primitives;

namespace Optic.Application.Domain.Entities;
public class Diagnosis : AggregateRoot
{
    public Diagnosis(int id, string name, string description) : base(id)
    {
        Name = name;
        Description = description;
    }

    public string Name { get; private set; }
    public string Description { get; private set; }

    public List<FormulaDiagnosis> FormulaDiagnosis { get; set; } = new();

    public void Update(string name, string description)
    {
        Name = name;
        Description = description;
    }
}