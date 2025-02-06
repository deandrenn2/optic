using Optic.Application.Domain.Entities;
using Optic.Application.Domain.Primitives;

public class Invoice : AggregateRoot
{
    public Invoice(int id, int number, DateTime date, decimal total, string state, string paymentType, int businessId, int? clientId) : base(id)
    {
        Number = number;
        Date = date;
        Total = total;
        PaymentType = paymentType;
        State = state;
        ClientId = clientId;
        BusinessId = businessId;
    }

    public int Number { get; set; }
    public DateTime Date { get; set; }
    public decimal Total { get; set; }
    public string State { get; set; }
    public string PaymentType { get; set; }
    public DateTime? DueDate { get; set; }
    public int? ClientId { get; set; }
    public Client Client { get; set; }
    public int BusinessId { get; set; }
    public Business Business { get; set; }
    public Formula Formula { get; set; }

    public List<InvoiceDetail> InvoiceDetails { get; set; } = new();
    public List<InvoicePayment> InvoicePayments { get; set; } = new();
    public List<InvoiceService> InvoiceServices { get; set; } = new();

    public static Invoice Create(int id, int number, DateTime date, decimal total, string state, string paymentType, int businessId, int? clientId)
    {
        return new Invoice(id, number, date, total, state, paymentType, businessId, clientId);
    }

    public void AddDetail(InvoiceDetail detail)
    {
        InvoiceDetails.Add(detail);
    }

    public void AddPayment(InvoicePayment payment)
    {
        InvoicePayments.Add(payment);
    }

    public void AddService(InvoiceService service)
    {
        InvoiceServices.Add(service);
    }
    public void Update(int number, DateTime date, decimal total, string state, int? clientId, int businessId)
    {
        Number = number;
        Date = date;
        Total = total;
        State = state;
        ClientId = clientId;
        BusinessId = businessId;
    }
}