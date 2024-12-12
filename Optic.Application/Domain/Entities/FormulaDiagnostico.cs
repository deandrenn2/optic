using Optic.Application.Domain.Primitives;

public class FormulaDiagnostico : AggregateRoot
{
    public FormulaDiagnostico(int id) : base(id)
    {

    }
    public FormulaDiagnostico(int id, string value) : base(id)
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