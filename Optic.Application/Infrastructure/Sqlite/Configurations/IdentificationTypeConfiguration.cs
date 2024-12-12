using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Optic.Application.Domain.Entities;

namespace Optic.Application.Infrastructure.Sqlite.Configurations;

public class IdentificationTypeConfiguration : IEntityTypeConfiguration<IdentificationType>
{
    public void Configure(EntityTypeBuilder<IdentificationType> builder)
    {
        builder.ToTable("IdentificationTypes");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.HasMany(x => x.Clients)
               .WithOne(x => x.IdentificationType)
               .HasForeignKey(x => x.IdentificationTypeId)
               .IsRequired(false);
        builder.HasData(
            new IdentificationType(1, 1, "Cédula de ciudadanía", "CC"),
            new IdentificationType(2, 2, "Tarjeta de Identidad", "TI"),
            new IdentificationType(3, 3, "Cédula de extranjería", "CE"),
            new IdentificationType(4, 4, "Pasaporte", "PA"),
            new IdentificationType(5, 5, "Registro Civil de Nacimiento", "RC"),
            new IdentificationType(6, 6, "Permiso Especial de Permanencia", "PEP"),
            new IdentificationType(7, 7, "Otro", "OO")
        );
    }
}

