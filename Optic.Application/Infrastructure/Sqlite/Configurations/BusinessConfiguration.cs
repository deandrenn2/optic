using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Optic.Application.Domain.Entities;

namespace Optic.Application.Infrastructure.Sqlite.Configurations;
internal class BusinessConfiguration : IEntityTypeConfiguration<Business>
{
    public void Configure(EntityTypeBuilder<Business> builder)
    {
        builder.HasKey(x => x.Id);
        builder.ToTable("Businesses");
        builder.HasIndex(x => x.CompanyName).IsUnique();
        builder.HasIndex(x => x.Nit).IsUnique();
    }
}

