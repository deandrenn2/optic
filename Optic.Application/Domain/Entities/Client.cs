using Optic.Application.Domain.Primitives;

namespace Optic.Application.Domain.Entities;

public class Client : AggregateRoot
{
    public Client(int id,
        string firstName,
        string lastName,
        int sex,
        int identificationTypeId,
        string identificationNumber,
        string email,
        string address,
        string cellPhoneNumber,
        string phoneNumber
        ) : base(id)
    {
        FirstName = firstName;
        LastName = lastName;
        Sex = sex;
        IdentificationTypeId = identificationTypeId;
        IdentificationNumber = identificationNumber;
        Email = email;
        Address = address;
        CellPhoneNumber = cellPhoneNumber;
        PhoneNumber = phoneNumber;
    }

    public string FirstName { get; private set; }
    public string LastName { get; private set; }
    public int Sex { get; private set; }
    public int IdentificationTypeId { get; private set; }
    public string IdentificationNumber { get; private set; }
    public string Email { get; private set; }
    public string Address { get; private set; }
    public string CellPhoneNumber { get; private set; }
    public string PhoneNumber { get; private set; }
    //public IdentificationType IdentificationType { get; private set; }

    public static Client Create(int id,
        string firstName,
        string lastName,
        int sex,
        int idIdentificationType,
        string identicationNumber,
        string email,
        string address,
        string cellPhoneNumber,
        string phoneNumber
    )
    {
        return new Client(id, firstName, lastName, sex, idIdentificationType, identicationNumber, email, address, cellPhoneNumber, phoneNumber);
    }

    public void Update(
    string firstName,
    string lastName,
    int sex,
    int identificationTypeId,
    string identificationNumber,
    string email,
    string address,
    string cellPhoneNumber,
    string phoneNumber
)
    {
        FirstName = firstName;
        LastName = lastName;
        Sex = sex;
        IdentificationTypeId = identificationTypeId;
        IdentificationNumber = identificationNumber;
        Email = email;
        Address = address;
        CellPhoneNumber = cellPhoneNumber;
        PhoneNumber = phoneNumber;
    }

}