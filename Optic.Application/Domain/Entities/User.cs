﻿using Optic.Application.Domain.Enums;
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

    public static User Create(int id,
    string firstName,
    string lastName,
    string email,
    string password,
    string securePharse)
    {
        var passwordHash = password.EncryptPassword();
        return new User(id, firstName, lastName, email, passwordHash,securePharse);
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

    public void ResetPassword(string securePharse)
    {
    }

    public void ValidatePasswordPassWord()
    {
    }
}
