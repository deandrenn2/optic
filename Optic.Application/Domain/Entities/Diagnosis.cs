using Optic.Application.Domain.Entities;
using Optic.Application.Domain.Primitives;

public class Diagnosis : AggregateRoot
{
    public Diagnosis(int id, string name) : base(id)
    {
        Name = name;
    }

    public string Name { get; private set; }
    public List<Formula> Formulas { get; set; } = new();

    public void Update(string name)
    {
        Name = name;
    }
}