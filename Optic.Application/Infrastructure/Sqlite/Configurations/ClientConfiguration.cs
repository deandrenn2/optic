using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Optic.Application.Domain.Entities;

namespace Optic.Application.Infrastructure.Sqlite.Configurations
{
    internal class ClientConfiguration : IEntityTypeConfiguration<Client>
    {
        public void Configure(EntityTypeBuilder<Client> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Clients");
            builder.HasIndex(x => x.IdentificationNumber).IsUnique();
        }
    }
}
