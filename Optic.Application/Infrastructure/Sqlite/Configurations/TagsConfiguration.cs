using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Optic.Application.Domain.Entities;

namespace Optic.Application.Infrastructure.Sqlite.Configurations;
public class TagsConfiguration : IEntityTypeConfiguration<Tags>
{
    public void Configure(EntityTypeBuilder<Tags> builder)
    {
        builder.ToTable("Tags");
        builder.HasKey(x => x.Id);
        builder.HasIndex(x => x.Name).IsUnique();
        builder.HasData(
            new Tags(1, "Visión Sencilla"),
            new Tags(2, "Bif. Flat top"),
            new Tags(3, "Bif. Invisible"),
            new Tags(4, "Progresivo"),
            new Tags(5, "Policarbonato"),
            new Tags(6, "Alto Índice"),
            new Tags(7, "Transitions"),
            new Tags(8, "Antirreflejo"),
            new Tags(9, "Protección UV"),
            new Tags(10, "Color"),
            new Tags(11, "Fotocromático")
    );
    }
}