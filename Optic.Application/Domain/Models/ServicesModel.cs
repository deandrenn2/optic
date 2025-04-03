namespace Optic.Application.Domain;
public class ServicesModel
{
    public int Id { get; set; }

    public int InvoiceId { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
}