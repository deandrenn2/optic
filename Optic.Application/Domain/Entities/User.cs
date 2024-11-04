using Optic.Application.Domain.Primitives;

namespace Optic.Application.Domain.Entities;

public class User : AggregateRoot
{

    private User(int id):base(id) { }

public User(int id,
        string firstName,
        string lastName,
        string email,
        string passWord,
        string securePharse) : base(id)
    {
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        Password = passWord;
        SecurePharse = securePharse;        
    }

    public string FirstName { get; private set; }
    public string LastName { get; private set; }
    public string Email { get; private set; }
    public string Password { get; private set; }
    public int IdRol { get; private set; } = 0;
    public string SecurePharse { get; private set; }

    public void Login(string email, string password)
    {

    }

    public void ResetPassword(string securePharse)
    {

    }

    public void ValidatePasswordPassWord()
    {

    }


}

