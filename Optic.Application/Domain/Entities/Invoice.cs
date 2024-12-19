using Optic.Application.Domain.Entities;
using Optic.Application.Domain.Primitives;

public class Invoice : AggregateRoot
{
    public Invoice(int id, string number, DateTime date, decimal total, string state, int? clientId, int businessId) : base(id)
    {
        Number = number;
        Date = date;
        Total = total;
        State = state;
        ClientId = clientId;
        BusinessId = businessId;
    }

    public string Number { get; set; }
    public DateTime Date { get; set; }
    public decimal Total { get; set; }
    public string State { get; set; }
    public DateTime? DueDate { get; set; }
    public int? ClientId { get; set; }
    public Client Client { get; set; }
    public int BusinessId { get; set; }
    public Business Business { get; set; }
    public Formula Formula { get; set; }

    public List<InvoiceDetail> InvoiceDetails { get; set; } = new();
    public List<InvoicePayments> InvoicePayments { get; set; } = new();
    public List<InvoiceServices> InvoiceServices { get; set; } = new();

    public static Invoice Create(int id, string number, DateTime date, decimal total, string state, int? clientId, int businessId)
    {
        return new Invoice(id, number, date, total, state, clientId, businessId);
    }
    public void Update(string number, DateTime date, decimal total, string state, int? clientId, int businessId)
    {
        Number = number;
        Date = date;
        Total = total;
        State = state;
        ClientId = clientId;
        BusinessId = businessId;
    }
}