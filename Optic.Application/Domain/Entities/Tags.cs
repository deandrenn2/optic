using Optic.Application.Domain.Primitives;
namespace Optic.Application.Domain.Entities;
public class Tags : AggregateRoot
{
    public Tags(int id, string name) : base(id)
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