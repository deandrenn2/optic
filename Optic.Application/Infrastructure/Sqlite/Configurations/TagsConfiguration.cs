using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Optic.Application.Domain.Entities;

namespace Optic.Application.Infrastructure.Sqlite.Configurations;
public class TagsConfiguration : IEntityTypeConfiguration<Tags>
{
    public void Configure(EntityTypeBuilder<Tags> builder)
    {
        builder.HasData(
            new Tags(1, "Visión Sencilla"),
            new Tags(2, "Bif. Flat top"),
            new Tags(3, "Bif. Invisible"),
            new Tags(4, "Bif. Ultex"),
            new Tags(5, "Bif. Ejecutivo"),
            new Tags(6, "Progresivo"),
            new Tags(7, "Plástico"),
            new Tags(8, "Vidrio Blanco"),
            new Tags(9, "Photogray"),
            new Tags(10, "Policarbonato"),
            new Tags(11, "Alto Índice"),
            new Tags(12, "Transitions"),
            new Tags(13, "Antirreflejo"),
            new Tags(14, "Protección UV")
    );
    }
}