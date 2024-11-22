using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Optic.Application.Domain.Entities;

namespace Optic.Application.Infrastructure.Sqlite.Configurations
{
    internal class SupplierConfiguration : IEntityTypeConfiguration<Supplier>
    {
        public void Configure(EntityTypeBuilder<Supplier> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Suppliers");
            builder.Property(x => x.Nit).IsRequired();
            builder.Property(x => x.Name).IsRequired();
            builder.Property(x => x.Address).IsRequired();
            builder.Property(x => x.CellPhoneNumber).IsRequired();
            builder.HasIndex(x => x.Nit);
        }
    }
}
