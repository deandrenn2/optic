using Optic.Application.Domain.Primitives;

namespace Optic.Application.Domain.Entities;

public class Invoice : AggregateRoot
{
    public Invoice(int id, int number, DateTime date, decimal total, string state, string paymentType, int businessId, int? clientId, string? documentType) : base(id)
    {
        Number = number;
        Date = date;
        Total = total;
        PaymentType = paymentType;
        State = state;
        ClientId = clientId;
        BusinessId = businessId;
        UpdateDate = DateTime.Now;
        CreateDate = DateTime.Now;
        DocumentType = documentType ?? "Formula";
    }

    public int Number { get; set; }
    public DateTime Date { get; set; }
    public decimal Total { get; set; }
    public string State { get; set; }
    public string PaymentType { get; set; }
    public string DocumentType { get; set; }
    public DateTime? DueDate { get; set; }
    public int? ClientId { get; set; }
    public Client Client { get; set; }
    public int BusinessId { get; set; }
    public Business Business { get; set; }
    public Formula Formula { get; set; }
    public DateTime UpdateDate { get; set; }
    public DateTime CreateDate { get; set; }
    public int? IdUserUpdate { get; set; }
    public int? IdUserCreate { get; set; }

    public List<InvoiceDetail> InvoiceDetails { get; set; } = new();
    public List<InvoicePayment> InvoicePayments { get; set; } = new();
    public List<InvoiceService> InvoiceServices { get; set; } = new();

    public static Invoice Create(int id, int number, DateTime date, decimal total, string state, string paymentType, int businessId, int? clientId, string? documentType = "Formula")
    {
        return new Invoice(id, number, date, total, state, paymentType, businessId, clientId, documentType);
    }

    public void AddDetail(InvoiceDetail detail)
    {
        InvoiceDetails.Add(detail);
    }

    public void RemoveDetail(List<InvoiceDetail> detail)
    {
        InvoiceDetails.RemoveAll(x => detail.Contains(x));
    }

    public void AddPayment(InvoicePayment payment)
    {
        InvoicePayments.Add(payment);
    }

    public void AddService(InvoiceService service)
    {
        InvoiceServices.Add(service);
    }

    public void UpdateState(string state)
    {
        State = state;
    }

    public void Update(int number, string paymentType, DateTime date, decimal total, int? clientId)
    {
        Number = number;
        PaymentType = paymentType;
        Date = date;
        Total = total;
        ClientId = clientId;
        UpdateDate = DateTime.Now;
    }
}