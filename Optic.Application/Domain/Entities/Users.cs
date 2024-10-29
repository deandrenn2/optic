using Optic.Application.Domain.Primitives;

namespace Optic.Application.Domain.Entities;

internal class Users : Entity
{
    public Users(Guid id,
        string firtName,
        string lastName,
        string email,
        string passWord,
        string securePharse) : base(id)
    {
        FirstName = firtName;
        LastName = lastName;
        Email = email;
        Password = passWord;
        SecurePharse = securePharse;
        
    }

    public string FirstName { get; private set; }
    public string SecurePharse { get; private set; }
    public string LastName { get; private set; }
    public string Email { get; private set; }
    public string Password{ get; private set; }
}

