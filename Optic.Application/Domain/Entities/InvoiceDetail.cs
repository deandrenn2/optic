using Optic.Application.Domain.Entities;
using Optic.Application.Domain.Primitives;

public class InvoiceDetail : AggregateRoot
{
    public InvoiceDetail(int id, int idInvoice, int idProduct, string description, decimal price, int quantity) : base(id)
    {
        IdInvoice = idInvoice;
        IdProduct = idProduct;
        Description = description;
        Price = price;
        Quantity = quantity;
    }

    public int IdInvoice { get; private set; }
    public Invoice Invoice { get; private set; }
    public string Description { get; private set; }
    public decimal Price { get; private set; }
    public int Quantity { get; private set; }
    public int IdProduct { get; private set; }
    public Product Product { get; private set; }

    public static InvoiceDetail Create(int id, int idInvoice, int idProduct, string description, decimal price, int quantity)
    {
        return new InvoiceDetail(id, idInvoice, idProduct, description, price, quantity);
    }

    public void Update(string description, decimal price, int quantity)
    {
        Description = description;
        Price = price;
        Quantity = quantity;
    }
}