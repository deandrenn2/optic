using Optic.Application.Domain.Primitives;

namespace Optic.Application.Domain.Entities;
public class Category : AggregateRoot
{
    public Category(int id, int number, string name) : base(id)
    {
        Number = number;
        Name = name;
    }

    public int Number { get; private set; }
    public string Name { get; private set; }
    public List<Product> Products { get; set; } = new();

    public void Update(string name)
    {
        Name = name;
    }

    public void Update(int number)
    {
        Number = number;
    }
}
