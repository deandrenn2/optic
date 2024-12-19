using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Optic.Application.Domain.Entities;

public class InvoiceConfiguration : IEntityTypeConfiguration<Invoice>
{
    public void Configure(EntityTypeBuilder<Invoice> builder)
    {
        builder.HasKey(x => x.Id);
        builder.ToTable("Invoices");
        builder.HasIndex(x => x.Number).IsUnique();
        builder.Property(x => x.Number).IsRequired();

        //Formula
        builder.HasOne(x => x.Formula)
            .WithOne(x => x.Invoice)
            .HasForeignKey<Formula>(x => x.IdInvoice)
            .OnDelete(DeleteBehavior.Cascade);

        //Client
        builder.HasOne(x => x.Client)
            .WithMany(x => x.Invoices)
            .HasForeignKey(x => x.ClientId)
            .OnDelete(DeleteBehavior.Cascade);

        //Business
        builder.HasOne(x => x.Business)
            .WithMany(x => x.Invoices)
            .HasForeignKey(x => x.BusinessId)
            .OnDelete(DeleteBehavior.Cascade);

        //InvoiceDetails
        builder.HasMany(x => x.InvoiceDetails)
            .WithOne(x => x.Invoice)
            .HasForeignKey(x => x.IdInvoice)
            .OnDelete(DeleteBehavior.Cascade);

        //InvoicePayments
        builder.HasMany(x => x.InvoicePayments)
            .WithOne(x => x.Invoice)
            .HasForeignKey(x => x.IdInvoice)
            .OnDelete(DeleteBehavior.Cascade);

        //InvoiceServices
        builder.HasMany(x => x.InvoiceServices)
            .WithOne(x => x.Invoice)
            .HasForeignKey(x => x.IdInvoice)
            .OnDelete(DeleteBehavior.Cascade);

    }
}