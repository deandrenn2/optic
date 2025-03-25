using Optic.Application.Domain.Enums;
namespace Optic.Application.Domain;
public record DiagnosisModel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
    public DataStateChange stateChange { get; set; } = 0;
}