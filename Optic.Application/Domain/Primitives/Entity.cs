namespace Optic.Application.Domain.Primitives;

public abstract class Entity
{
    private Entity()
    {

    }

    protected Entity(int id)
    {
        Id = id;
    }

    public int Id { get; private set;}
}
