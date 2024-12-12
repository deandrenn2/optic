using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Optic.Application.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Optic.Application.Infrastructure.Sqlite.Configurations
{
    internal class FormulasConfiguration : IEntityTypeConfiguration<Formulas>
    {
        public void Configure(EntityTypeBuilder<Formulas> builder)
        { 
            builder.HasKey(x => x.Id);
            builder.ToTable("Formulas");
            builder.Property(x => x.Id).IsRequired();
            builder.Property(x => x.Date).IsRequired();
            builder.Property(x => x.TypePay).IsRequired();
            builder.Property(x => x.TypeLens).IsRequired();
            builder.Property(x => x.PriceLens).IsRequired();
            builder.Property(x => x.QueryValue).IsRequired();
            builder.Property(x => x.Descriptions);
            //builder.hasForeignKey(x => x.ClientId);
        }
    }
}
