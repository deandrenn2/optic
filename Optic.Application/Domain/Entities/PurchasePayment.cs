using Optic.Application.Domain.Primitives;

namespace Optic.Application.Domain.Entities;
public class PurchasePayment : AggregateRoot
{
    public PurchasePayment(int id, int idPurchase, decimal amount) : base(id)
    {
        IdPurchase = idPurchase;
        Amount = amount;
    }

    public int IdPurchase { get; private set; }
    public Purchase Purchase { get; private set; }
    public decimal Amount { get; private set; }
    public DateTime Date { get; private set; } = DateTime.Now;

    public static PurchasePayment Create(int id, int idPurchase, decimal amount)
    {
        return new PurchasePayment(id, idPurchase, amount);
    }

    public void Update(decimal amount)
    {
        Amount = amount;
    }
}