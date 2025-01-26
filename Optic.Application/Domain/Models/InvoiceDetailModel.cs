public record InvoiceDetailModel
{
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }

    public int Quantity { get; set; }
    public int IdProduct { get; set; }
    public int IdInvoice { get; set; }
}