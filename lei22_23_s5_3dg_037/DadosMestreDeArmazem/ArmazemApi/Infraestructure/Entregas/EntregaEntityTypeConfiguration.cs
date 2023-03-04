using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ArmazemApi.Domain.Entregas;

namespace ArmazemApi.Infraestructure.Entregas
{
    internal class EntregaEntityTypeConfiguration : IEntityTypeConfiguration<Entrega>
    {
        public void Configure(EntityTypeBuilder<Entrega> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx
            
            builder.ToTable("Entrega",SchemaNames.Armazem);
            builder.HasKey(b => b.Id);
            builder.OwnsOne(b=> b.DataEntrega);
            builder.OwnsOne(b=> b.MassaEntrega);
            builder.OwnsOne(b=> b.TempoColocarEntrega);
            builder.OwnsOne(b=> b.TempoRetirarEntrega);
            //builder.OwnsOne(b=> b.ArmazemID);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}