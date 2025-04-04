using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Optic.Application.Domain.Entities;

namespace Optic.Application.Infrastructure.Sqlite.Configurations;
internal class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.HasKey(x => x.Id);
        builder.ToTable("Products");
        builder.HasMany(x => x.Categories)
        .WithMany(x => x.Products).UsingEntity("PoductCategories");

        //Supplier
        builder.HasOne(x => x.Supplier)
            .WithMany(x => x.Products)
            .HasForeignKey(x => x.IdSupplier)
            .OnDelete(DeleteBehavior.Cascade);

        //InvoiceDetails
        builder.HasMany(x => x.InvoiceDetails)
            .WithOne(x => x.Product)
            .HasForeignKey(x => x.IdProduct)
            .OnDelete(DeleteBehavior.Cascade);

        //PurchaseDetails
        builder.HasMany(x => x.PurchaseDetails)
            .WithOne(x => x.Product)
            .HasForeignKey(x => x.IdProduct)
            .OnDelete(DeleteBehavior.Cascade);
    }
}