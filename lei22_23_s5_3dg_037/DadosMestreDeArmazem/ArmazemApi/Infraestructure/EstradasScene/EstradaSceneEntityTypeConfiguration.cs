using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ArmazemApi.Domain.EstradasScene;

namespace ArmazemApi.Infraestructure.EstradasScene
{
    internal class EstradaSceneEntityTypeConfiguration : IEntityTypeConfiguration<EstradaScene>
    {
        public void Configure(EntityTypeBuilder<EstradaScene> builder)
        {
            builder.ToTable("EstradaScene",SchemaNames.Armazem);
            builder.HasKey(b => b.Id);
            builder.OwnsOne(b=> b.EstradaUrl);
        }
    }
}