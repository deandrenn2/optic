using Optic.Application.Domain.Enums;
using Optic.Application.Domain.Extensions;
using Optic.Application.Domain.Primitives;
using Optic.Domain.Extensions;
using Optic.Domain.Shared;

namespace Optic.Application.Domain.Entities;

public class User : AggregateRoot
{

    private User(int id) : base(id) { }

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
    public int IdRol { get; private set; } = 2;
    public string SecurePharse { get; private set; }
    public int StatusId { get; private set; } = 1;
    public int IdAvatar { get; private set; } = NumberRandom.Random(1, 20);

    public static User Create(int id,
    string firstName,
    string lastName,
    string email,
    string password,
    string securePharse)
    {
        var passwordHash = password.EncryptPassword();
        return new User(id, firstName, lastName, email, passwordHash, securePharse);
    }


    public Result Login(string password)
    {
        var isPasswordMatch = this.Password == password.EncryptPassword();

        if (!isPasswordMatch)
        {
            return Result.Failure(new Error("Autentication.NotMatchPassword", "Credenciales de acceso no validas"));
        }

        var isActive = (UserStatus)this.StatusId == UserStatus.Active;

        if (!isActive)
        {
            return Result.Failure(new Error("Autentication.NotActive", "Usuario inactivo o bloqueado"));
        }

        //AddDomainEvent(new UserLoginDomainEvent(Guid.NewGuid(), this));

        return Result.Success("Autenticado correctamente");
    }

    public bool ValidateSecurePharse(string securePharse)
    {
        return this.SecurePharse.Trim().ToUpper() == securePharse.Trim().ToUpper();
    }

    public void UpdatePassword(string password)
    {
        this.Password = password.EncryptPassword();
    }

    public void Update(string firstName, string lastName, string email)
    {
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Email = email;
    }

    public void SetAvatar(int id)
    {
        this.IdAvatar = id;
    }
}

