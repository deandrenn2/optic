using Optic.Application.Domain.Enums;
using Optic.Application.Domain.Primitives;

namespace Optic.Application.Domain.Entities;

internal class Clients : AggregateRoot
{
    public Clients(int id,
        string firtName,
        string lastName,
        Sex sex,
        string email,
        string address,
        string cellPhoneNumber,
        string phoneNumber,
        int idIdentificaciontionType,
        string identificationNumber
        ) : base(id)
    {
        FirstName = firtName;
        LastName = lastName;
        Sex = sex;
        Email = email;
        Address = address;
        CellPhoneNumber = cellPhoneNumber;
        PhoneNumber = phoneNumber;
        IdIdentificaciontionType = idIdentificaciontionType;
        IdentificationNumber = identificationNumber;
    }

    public string FirstName { get; private set; }
    public string LastName { get; private set; }
    public string Email { get; private set; }
    public Sex Sex { get; private set; }
    public string Address { get; private set; }
    public string CellPhoneNumber { get; private set; }
    public string PhoneNumber { get; private set; }
    public int IdIdentificaciontionType { get; private set; }
    public string IdentificationNumber { get; private set; }

}