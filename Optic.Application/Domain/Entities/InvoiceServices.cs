using Optic.Application.Domain.Primitives;

namespace Optic.Application.Domain.Entities;
public class InvoiceService : AggregateRoot
{
    public InvoiceService(int id, int idInvoice, string description, decimal price) : base(id)
    {
        IdInvoice = idInvoice;
        Description = description;
        Price = price;
    }

    public int IdInvoice { get; private set; }
    public Invoice Invoice { get; private set; }
    public string Description { get; private set; }
    public decimal Price { get; private set; }
    public static InvoiceService Create(int id, int idInvoice, string description, decimal price)
    {
        return new InvoiceService(id, idInvoice, description, price);
    }

    public void Update(string description, decimal price)
    {
        Description = description;
        Price = price;
    }
}