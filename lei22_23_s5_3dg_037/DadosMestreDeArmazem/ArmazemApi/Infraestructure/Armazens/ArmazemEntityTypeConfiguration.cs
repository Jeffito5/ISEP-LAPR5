using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ArmazemApi.Domain.Armazens;

namespace ArmazemApi.Infraestructure.Armazens
{
    internal class ArmazemEntityTypeConfiguration : IEntityTypeConfiguration<Armazem>
    {
        public void Configure(EntityTypeBuilder<Armazem> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx
            
            builder.ToTable("Armazem",SchemaNames.Armazem);
            builder.HasKey(b => b.Id);
            builder.OwnsOne(b=> b.Coordenadas);
            builder.OwnsOne(b=> b.Endereco);
        }
    }
}