using Optic.Application.Domain.Primitives;

namespace Optic.Application.Domain.Entities
{
    public class Supplier : AggregateRoot
    {
        public Supplier(
            int id,
            string name,
            string nit,
            string address,
            string cellPhoneNumber
            ) : base(id)
        {
            Name = name;
            Nit = nit;
            Address = address;
            CellPhoneNumber = cellPhoneNumber;
        }

        public Supplier(
     int id,
     string name,
     string nit,
     string address,
     string cellPhoneNumber,
     string phoneNumber,
     string email
     ) : base(id)
        {
            Name = name;
            Nit = nit;
            Address = address;
            CellPhoneNumber = cellPhoneNumber;
            PhoneNumber = phoneNumber;
            Email = email;
        }

        public string Name { get; private set; }
        public string Nit { get; private set; }
        public string Address { get; private set; }
        public string? Email { get; private set; }
        public string CellPhoneNumber { get; private set; }
        public string? PhoneNumber { get; private set; }
        public List<Product> Products { get; set; } = new();
        public List<Purchase> Purchases { get; set; } = new();

        public static Supplier Create(
            int id,
            string name,
            string nit,
            string address,
            string cellPhoneNumber,
            string phoneNumber,
            string email
            )
        {

            Supplier supplier = new(id,
           name,
           nit,
           address,
           cellPhoneNumber
           )
            {
                Email = email,
                PhoneNumber = phoneNumber
            };

            return supplier;
        }

        public void Update(
            string name,
            string nit,
            string address,
            string cellPhoneNumber,
            string phoneNumber,
            string email
            )
        {
            Name = name;
            Nit = nit;
            Address = address;
            CellPhoneNumber = cellPhoneNumber;
            PhoneNumber = phoneNumber;
            Email = email;
        }
    }
}
