using Optic.Application.Domain.Primitives;

public class FormulaDiagnosis : AggregateRoot
{
    public FormulaDiagnosis(int id) : base(id)
    {

    }
    public FormulaDiagnosis(int id, string value) : base(id)
    {
        Value = value;
    }

    public string Value { get; set; }
    public int IdDiagnostico { get; set; }
    public int IdFormula { get; set; }

    public void Update(string value)
    {
        Value = value;
    }
}