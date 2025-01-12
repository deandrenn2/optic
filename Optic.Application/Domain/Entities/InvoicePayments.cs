using Optic.Application.Domain.Primitives;

namespace Optic.Application.Domain.Entities;
public class InvoicePayment : AggregateRoot
{
    public InvoicePayment(int id, int idInvoice, decimal amount) : base(id)
    {
        IdInvoice = idInvoice;
        Amount = amount;
    }

    public int IdInvoice { get; private set; }
    public Invoice Invoice { get; private set; }
    public decimal Amount { get; private set; }
    public DateTime Date { get; private set; } = DateTime.Now;

    public static InvoicePayment Create(int id, int idInvoice, decimal amount)
    {
        return new InvoicePayment(id, idInvoice, amount);
    }

    public void Update(decimal amount)
    {
        Amount = amount;
    }
}