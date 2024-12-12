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
    internal class FormulasConfiguration : IEntityTypeConfiguration<Formula>
    {
        public void Configure(EntityTypeBuilder<Formula> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Formulas");
            builder.Property(x => x.Id).IsRequired();

            //Cliente
            builder.HasOne(x => x.Client)
                .WithMany(x => x.Formulas)
                .HasForeignKey(x => x.ClientId)
                .OnDelete(DeleteBehavior.Cascade);

            //Business
            builder.HasOne(x => x.Business)
                .WithMany(x => x.Formulas)
                .HasForeignKey(x => x.BusinessId)
                .OnDelete(DeleteBehavior.Cascade);

            //Tags
            builder.HasMany(x => x.Tags)
                .WithMany(x => x.Formulas)
                .UsingEntity("FormulasTags");

            //Diagnosis
            builder.HasMany(x => x.Diagnosis)
                .WithMany(x => x.Formulas)
                .UsingEntity<FormulaDiagnostico>("FormulasDiagnosticos");
        }
    }
}
