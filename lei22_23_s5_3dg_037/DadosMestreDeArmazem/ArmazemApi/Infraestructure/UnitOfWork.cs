using System.Threading.Tasks;
using ArmazemApi.Domain.Shared;

namespace ArmazemApi.Infraestructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ArmazemDbContext _context;

        public UnitOfWork(ArmazemDbContext context)
        {
            this._context = context;
        }

        public async Task<int> CommitAsync()
        {
            return await this._context.SaveChangesAsync();
        }
    }
}