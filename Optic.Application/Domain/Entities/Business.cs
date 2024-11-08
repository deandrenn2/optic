using Optic.Application.Domain.Primitives;

namespace Optic.Application.Domain.Entities
{
    internal class Business : AggregateRoot
    {
        public Business(int id,
            string companyName,
            string nit,
            string address,
            string cellPhoneNumber,
            string phoneNumber) : base(id)
        {
            CompanyName = companyName;
            Nit = nit;
            Address = address;
            CellPhoneNumber = cellPhoneNumber;
            PhoneNumber = phoneNumber;
        }

        public string CompanyName { get; private set; }
        public string Nit { get; private set; }
        public string Address { get; private set; }
        public string CellPhoneNumber { get; private set; }
        public string PhoneNumber { get; private set; }
        public string UrlLogo { get; private set; } = "initials-logo.svg";
    }
}
