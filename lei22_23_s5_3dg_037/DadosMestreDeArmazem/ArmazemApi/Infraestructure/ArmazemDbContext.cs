using Microsoft.EntityFrameworkCore;
using ArmazemApi.Domain.Entregas;
using ArmazemApi.Domain.Armazens;
using ArmazemApi.Domain.EstradasScene;
using ArmazemApi.Domain.Armazens.DadosScene;
using ArmazemApi.Infraestructure.Armazens;
using ArmazemApi.Infraestructure.Entregas;
using ArmazemApi.Infraestructure.DadosScenes;
using ArmazemApi.Infraestructure.EstradasScene;

namespace ArmazemApi.Infraestructure
{
    public class ArmazemDbContext : DbContext
    {
        public DbSet<Entrega> Entregas { get; set; }

        public DbSet<Armazem> Armazens {get; set;}

        public DbSet<ArmazemScene> ArmazemScenes {get; set;}

        public DbSet<EstradaScene> EstradaScenes {get; set;}

        public ArmazemDbContext(DbContextOptions options) : base(options)
        {
            //Database.EnsureDeleted();
            Database.EnsureCreated();  
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ArmazemEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new EntregaEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ArmazemSceneEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new EstradaSceneEntityTypeConfiguration());
        }
    }
}