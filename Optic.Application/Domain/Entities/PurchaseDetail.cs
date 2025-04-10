using Optic.Application.Domain.Primitives;

namespace Optic.Application.Domain.Entities;
public class PurchaseDetail : AggregateRoot
{
    public PurchaseDetail(int id, int idPurchase, int idProduct, string description, decimal price, int quantity, decimal priceSale) : base(id)
    {
        IdPurchase = idPurchase;
        IdProduct = idProduct;
        Description = description;
        Price = price;
        Quantity = quantity;
        PriceSale = priceSale;
    }

    public int IdPurchase { get; private set; }
    public Purchase Purchase { get; private set; }
    public string Description { get; private set; }
    public decimal Price { get; private set; }
    public int Quantity { get; private set; }
    public decimal PriceSale { get; private set; }
    public int IdProduct { get; private set; }
    public Product Product { get; private set; }

    public static PurchaseDetail Create(int id, int idPurchase, int idProduct, string description, decimal price, int quantity, decimal priceSale)
    {
        return new PurchaseDetail(id, idPurchase, idProduct, description, price, quantity, priceSale);
    }

    public void Update(string description, decimal price, int quantity)
    {
        Description = description;
        Price = price;
        Quantity = quantity;
    }
}