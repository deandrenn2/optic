using Optic.Application.Domain.Primitives;

namespace Optic.Application.Domain.Entities
{
    public class Business : AggregateRoot
    {
        public Business(int id,
            string companyName,
            string abbreviation,
            string nit,
            string address,
            string city,
            string cellPhoneNumber,
            string phoneNumber) : base(id)
        {
            CompanyName = companyName;
            Abbreviation = abbreviation;
            Nit = nit;
            Address = address;
            City = city;
            CellPhoneNumber = cellPhoneNumber;
            PhoneNumber = phoneNumber;
        }

        public string CompanyName { get; private set; }
        public string Abbreviation { get; private set; }
        public string Nit { get; private set; }
        public string City { get; private set; }
        public string Address { get; private set; }
        public string CellPhoneNumber { get; private set; }
        public string PhoneNumber { get; private set; }
        public string UrlLogo { get; private set; } = "initials-logo.svg";
        public List<Formula> Formulas { get; set; } = new();
        public List<Invoice> Invoices { get; set; } = new();


        public static Business Create(
            int id,
            string companyName,
            string abbreviation,
            string nit,
            string address,
            string city,
            string cellPhoneNumber,
            string phoneNumber
)
        {
            return new Business(id,
                companyName,
                abbreviation,
                nit,
                address,
                city,
                cellPhoneNumber,
                phoneNumber);
        }

        public void Update(string companyName, string abbreviation, string nit, string address, string city, string cellPhoneNumber, string phoneNumber)
        {
            this.CompanyName = companyName;
            this.Abbreviation = abbreviation;
            this.Nit = nit;
            this.Address = address;
            this.City = city;
            this.CellPhoneNumber = cellPhoneNumber;
            this.PhoneNumber = phoneNumber;
        }
    }




}
