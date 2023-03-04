using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ArmazemApi.Infraestructure;
using ArmazemApi.Infraestructure.Armazens;
using ArmazemApi.Infraestructure.DadosScenes;
using ArmazemApi.Infraestructure.Entregas;
using ArmazemApi.Infraestructure.EstradasScene;
using ArmazemApi.Infraestructure.Shared;
using ArmazemApi.Domain.Shared;
using ArmazemApi.Domain.Armazens;
using ArmazemApi.Domain.Armazens.DadosScene;
using ArmazemApi.Domain.Entregas;
using ArmazemApi.Domain.EstradasScene;
using ArmazemApi.Controllers;

namespace ArmazemApi{
    public class Startup{

        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration){
            this.Configuration=configuration;
        }


        public void ConfigureServices(IServiceCollection services){
            services.AddCors(options => options.AddPolicy(name: "AllowOrigin",
            builder => {builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();}));
            services.AddDbContext<ArmazemDbContext>(opt=> opt.UseSqlServer(Configuration.GetConnectionString("ArmazemConnection")).ReplaceService<IValueConverterSelector,StronglyEntityIdValueConverterSelector>()/*.UseLazyLoadingProxies()*/);

            ConfigureMyServices(services);
            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env){
            app.UseCors("AllowOrigin");
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

        
            app.UseSwagger();
            app.UseSwaggerUI();
            

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork,UnitOfWork>();

            services.AddTransient<IArmazemRepository,ArmazemRepository>();
            services.AddTransient<ArmazemService>();

            services.AddTransient<IEntregaRepository,EntregaRepository>();
            services.AddTransient<EntregaService>();

            services.AddTransient<IArmazemSceneRepository,ArmazemSceneRepository>();
            services.AddTransient<ArmazemSceneService>();

            services.AddTransient<IEstradaSceneRepository,EstradaSceneRepository>();
            services.AddTransient<EstradaSceneService>();
        }
    }
}

