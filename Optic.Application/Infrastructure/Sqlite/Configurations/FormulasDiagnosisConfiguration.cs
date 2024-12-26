using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

internal class FormulaDiagnosisConfiguration : IEntityTypeConfiguration<FormulaDiagnosis>
{
    public void Configure(EntityTypeBuilder<FormulaDiagnosis> builder)
    {
        builder.ToTable("FormulasDiagnosis");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedNever();

        builder.HasOne(x => x.Diagnosis)
            .WithMany(x => x.FormulaDiagnosis)
            .HasForeignKey(x => x.IdDiagnostico)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Formula)
            .WithMany(x => x.FormulaDiagnosis)
            .HasForeignKey(x => x.IdFormula)
            .OnDelete(DeleteBehavior.Cascade);
    }
}