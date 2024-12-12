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
            new Setting(2, "THEME", "Tema: Dark/Light", "Dark")
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

