using Microsoft.EntityFrameworkCore;
using ArmazemApi.Infraestructure;
using ArmazemApi.Infraestructure.Shared;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace ArmazemApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}