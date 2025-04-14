using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Optic.Application.Domain.Entities;

namespace Optic.Application.Infrastructure.Sqlite.Configurations;
public class SettingConfiguration : IEntityTypeConfiguration<Setting>
{
    public void Configure(EntityTypeBuilder<Setting> builder)
    {
        builder.ToTable("Settings");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.HasData(
            new Setting(1, "LIST_SEXES", "Lista de sexos", "[{\"Id\":1,\"Name\":\"Masculino\"},{\"Id\":2,\"Name\":\"Femenino\"}]"),
            new Setting(2, "THEME", "Tema: Dark/Light", "Dark"),
            new Setting(3, "LIST_BRAND", "Lista de marcas", "[{\"Id\":1,\"Name\":\"Valentin\"},{\"Id\":2,\"Name\":\"Mebixza\"},{\"Id\":3,\"Name\":\"VIVAIO\"},{\"Id\":4,\"Name\":\"OH\"},{\"Id\":5,\"Name\":\"Miratto\"},{\"Id\":6,\"Name\":\"Martinni\"},{\"Id\":7,\"Name\":\"CODE\"},{\"Id\":8,\"Name\":\"OKLEY\"},{\"Id\":9,\"Name\":\"OCHOYMEDIO\"},{\"Id\":10,\"Name\":\"⁠KIDS Miratto\"},{\"Id\":11,\"Name\":\"FREEGEN\"},{\"Id\":12,\"Name\":\"SOLUTER\"},{\"Id\":13,\"Name\":\"OPTI-FREE\"}]"),
            new Setting(4, "ENABLED_BARCODE", "Habilitar código de barras", "false")
            );
    }
}

public class SettingUserConfiguration : IEntityTypeConfiguration<SettingUser>
{
    public void Configure(EntityTypeBuilder<SettingUser> builder)
    {
        builder.ToTable("SettingsUsers");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedNever();
    }
}

