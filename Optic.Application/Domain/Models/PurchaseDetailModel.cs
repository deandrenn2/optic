namespace Optic.Application.Domain;

public record PurchaseDetailModel
{
    public int? Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }

    public string? ProductName { get; set; }

    public int Quantity { get; set; }
    public int IdProduct { get; set; }
    public int IdPurchase { get; set; }
}