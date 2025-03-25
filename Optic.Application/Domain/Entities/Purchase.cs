using Optic.Application.Domain.Primitives;

namespace Optic.Application.Domain.Entities;

public class Purchase : AggregateRoot
{
    public Purchase(int id, int number, DateTime date, decimal total, string state, string paymentType, int businessId, int supplierId) : base(id)
    {
        Number = number;
        Date = date;
        Total = total;
        PaymentType = paymentType;
        State = state;
        BusinessId = businessId;
        SupplierId = supplierId;
    }

    public int Number { get; set; }
    public DateTime Date { get; set; }
    public decimal Total { get; set; }
    public string State { get; set; }
    public string PaymentType { get; set; }
    public DateTime? DueDate { get; set; }
    public int BusinessId { get; set; }
    public Business Business { get; set; }
    public int SupplierId { get; set; }
    public Supplier Supplier { get; set; }
    public DateTime UpdateDate { get; set; }
    public DateTime CreateDate { get; set; }
    public int? IdUserUpdate { get; set; }
    public int? IdUserCreate { get; set; }

    public List<PurchaseDetail> PurchaseDetails { get; set; } = new();
    public List<PurchasePayment> PuerchasePayments { get; set; } = new();

    public static Purchase Create(int id, int number, DateTime date, decimal total, string state, string paymentType, int businessId, int supplierId)
    {
        return new Purchase(id, number, date, total, state, paymentType, businessId, supplierId);
    }

    public void AddDetail(PurchaseDetail detail)
    {
        PurchaseDetails.Add(detail);
    }

    public void RemoveDetail(List<PurchaseDetail> detail)
    {
        PurchaseDetails.RemoveAll(x => detail.Contains(x));
    }

    public void AddPayment(PurchasePayment payment)
    {
        PuerchasePayments.Add(payment);
    }

    public void UpdateState(string state)
    {
        State = state;
    }

    public void Update(int number, string paymentType, DateTime date, decimal total, int supplierId)
    {
        Number = number;
        PaymentType = paymentType;
        Date = date;
        Total = total;
        SupplierId = supplierId;
    }
}