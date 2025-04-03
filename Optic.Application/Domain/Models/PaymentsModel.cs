
namespace Optic.Application.Domain;
public record PaymentsModel
{
    public int Id { get; set; }
    public decimal Amount { get; set; }
    public DateTime Date { get; set; }
}