using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ArmazemApi.Domain.Armazens.DadosScene;

namespace ArmazemApi.Infraestructure.DadosScenes
{
    internal class ArmazemSceneEntityTypeConfiguration : IEntityTypeConfiguration<ArmazemScene>
    {
        public void Configure(EntityTypeBuilder<ArmazemScene> builder)
        {
            builder.ToTable("ArmazemScene",SchemaNames.Armazem);
            builder.HasKey(b => b.Id);
            builder.HasIndex(b=> b.ArmazemId).IsUnique();
            builder.OwnsOne(b=> b.EstradaUrl);
            builder.OwnsOne(b=> b.RotundaUrl);
            builder.OwnsOne(b=> b.TexturaArmazemUrl);
        }
    }
}