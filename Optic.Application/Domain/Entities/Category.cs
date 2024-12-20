using Optic.Application.Domain.Primitives;

namespace Optic.Application.Domain.Entities;
public class Category : AggregateRoot
{
    Category(int id, string name) : base(id)
    {
        Name = name;
    }
    public string Name { get; private set; }
    public List<Product> Products { get; set; } = new();

    public static Category Create(string name)
    {
        return new Category(0, name);
    }

    public void Update(string name)
    {
        Name = name;
    }
}