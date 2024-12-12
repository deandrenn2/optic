using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Optic.Application.Domain.Entities;

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
    }
}