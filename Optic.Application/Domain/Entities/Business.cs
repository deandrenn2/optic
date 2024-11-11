using Optic.Application.Domain.Primitives;

namespace Optic.Application.Domain.Entities
{
    public class Business : AggregateRoot
    {
        public Business(int id,
            string companyName,
            string nit,
            string address,
            string city,
            string cellPhoneNumber,
            string phoneNumber) : base(id)
        {
            CompanyName = companyName;
            Nit = nit;
            Address = address;
            City = city;
            CellPhoneNumber = cellPhoneNumber;
            PhoneNumber = phoneNumber;
        }

        public string CompanyName { get; private set; }
        public string Nit { get; private set; }
        public string City { get; private set; }
        public string Address { get; private set; }
        public string CellPhoneNumber { get; private set; }
        public string PhoneNumber { get; private set; }
        public string UrlLogo { get; private set; } = "initials-logo.svg";


        public static Business Create(
            int id,
            string companyName,
            string nit,
            string address,
            string city,
            string cellPhoneNumber,
            string phoneNumber
)
        {
            return new Business(id,
                companyName,
                nit,
                address,
                city,
                cellPhoneNumber,
                phoneNumber);
        }
    }




}
