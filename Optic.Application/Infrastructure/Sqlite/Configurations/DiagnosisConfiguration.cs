using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Optic.Application.Domain.Entities;

namespace Optic.Application.Infrastructure.Sqlite.Configurations;
public class DiagnosisConfiguration : IEntityTypeConfiguration<Diagnosis>
{
    public void Configure(EntityTypeBuilder<Diagnosis> builder)
    {
        builder.ToTable("Diagnosis");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.HasIndex(x => x.Name).IsUnique();
        builder.HasData(
            new Diagnosis(1, "OD_ESF", "OD, se refiere al ojo derecho. Esf (Esfera), Indica la potencia de la lente para corregir la miopía (valores negativos) o la hipermetropía (valores positivos)"),
            new Diagnosis(2, "OI_ESF", " OI, se refiere al ojo izquierdo. Esf (Esfera), Indica la potencia de la lente para corregir la miopía (valores negativos) o la hipermetropía (valores positivos)"),
            new Diagnosis(3, "OD_CIL", "OD, se refiere al ojo derecho. Cil (Cilindro), Indica el poder de la lente para corregir el astigmatismo"),
            new Diagnosis(4, "OI_CIL", "OI, se refiere al ojo izquierdo. Cil (Cilindro), Indica el poder de la lente para corregir el astigmatismo"),
            new Diagnosis(5, "OD_EJE", "OD, se refiere al ojo derecho. Eje (Eje), Es el ángulo en grados que define la orientación del cilindro para corregir el astigmatismo"),
            new Diagnosis(6, "OI_EJE", "OI, se refiere al ojo izquierdo. Eje (Eje), Es el ángulo en grados que define la orientación del cilindro para corregir el astigmatismo"),
            new Diagnosis(7, "ADD", "ADD (Adición), Se refiere a la potencia adicional que se añade en la parte inferior de los lentes para corregir la presbicia, o dificultad para ver de cerca."),
            // new Diagnosis(8, "COLOR", "Podría referirse al color del lente, si tiene un tinte específico para reducir el brillo o mejorar el contraste."),
            // new Diagnosis(8, "UV", "Indica si las lentes tienen protección contra los rayos ultravioleta (UV)"),
            // new Diagnosis(10, "VDT", "Indica si las lentes tienen protección contra los rayos visibles infrarrojos (VDT)"),
            // new Diagnosis(11, "RLX", "Indica si las lentes tienen algún tipo de relajación visual o filtro especial para reducir la fatiga ocular"),
            new Diagnosis(8, "DP", "Distancia Pupilar, Es la distancia entre la entrada del ojo y la salida del mismo, en milímetros"),
            new Diagnosis(9, "AB", "Este campo podría hacer referencia a la altura bifocal o algún otro ajuste específico de las lentes"),
            new Diagnosis(10, "ALT", "Altura de montaje de la lente. La distancia vertical desde la parte inferior del armazón hasta el centro óptico o punto de enfoque de la lente, especialmente relevante en lentes progresivos o bifocales")
        );
    }
}