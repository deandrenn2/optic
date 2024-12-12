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
            new Setting(3, "LIST_BRAND", "Lista de marcas", "[{\"Id\":1,\"Name\":\"Ray-Ban\"},{\"Id\":2,\"Name\":\"Oakley\"},{\"Id\":3,\"Name\":\"Incooptics\"},{\"Id\":4,\"Name\":\"Ópticas GMO\"},{\"Id\":5,\"Name\":\"Guess\"},{\"Id\":6,\"Name\":\"Silhouette\"},{\"Id\":7,\"Name\":\"Gucci\"},{\"Id\":8,\"Name\":\"Calvin Klein\"},{\"Id\":9,\"Name\":\"Tommy Hilfiger\"},{\"Id\":10,\"Name\":\"Carrera\"}]"),
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

