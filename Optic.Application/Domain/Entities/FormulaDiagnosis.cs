using Optic.Application.Domain.Entities;
using Optic.Application.Domain.Primitives;

public class FormulaDiagnosis : AggregateRoot
{
    public FormulaDiagnosis(int id, int idDiagnostico, int idFormula, string value) : base(id)
    {
        Value = value;
        IdDiagnostico = idDiagnostico;
        IdFormula = idFormula;
    }

    public string Value { get; set; }
    public int IdDiagnostico { get; set; }
    public Diagnosis Diagnosis { get; set; }
    public int IdFormula { get; set; }
    public Formula Formula { get; set; }

    public void Update(string value)
    {
        Value = value;
    }
}