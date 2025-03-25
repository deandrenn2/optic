using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Optic.Application.Domain.Entities;

namespace Optic.Application.Infrastructure.Sqlite.Configurations;
public class PurchaseConfiguration : IEntityTypeConfiguration<Purchase>
{
    public void Configure(EntityTypeBuilder<Purchase> builder)
    {
        builder.HasKey(x => x.Id);
        builder.ToTable("Purchases");
        builder.HasIndex(x => x.Number).IsUnique();
        builder.Property(x => x.Number).IsRequired();


        //Supplier
        builder.HasOne(x => x.Supplier)
            .WithMany(x => x.Purchases)
            .HasForeignKey(x => x.SupplierId)
            .OnDelete(DeleteBehavior.Cascade);

        //Business
        builder.HasOne(x => x.Business)
            .WithMany(x => x.Purchases)
            .HasForeignKey(x => x.BusinessId)
            .OnDelete(DeleteBehavior.Cascade);

        //InvoiceDetails
        builder.HasMany(x => x.PurchaseDetails)
            .WithOne(x => x.Purchase)
            .HasForeignKey(x => x.IdPurchase)
            .OnDelete(DeleteBehavior.Cascade);

        //InvoicePayments
        builder.HasMany(x => x.PuerchasePayments)
            .WithOne(x => x.Purchase)
            .HasForeignKey(x => x.IdPurchase)
            .OnDelete(DeleteBehavior.Cascade);

    }
}