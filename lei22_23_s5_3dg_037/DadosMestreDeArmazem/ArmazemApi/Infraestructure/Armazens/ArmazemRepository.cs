using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ArmazemApi.Domain.Armazens;
using ArmazemApi.Infraestructure.Shared;

namespace ArmazemApi.Infraestructure.Armazens
{
    public class ArmazemRepository : BaseRepository<Armazem, ArmazemId>,IArmazemRepository
    {
        public ArmazemRepository(ArmazemDbContext context):base(context.Armazens)
        {
           
        }

        public async Task<List<Armazem>> GetByDesignacaoAsync(String designacao){
             return await _objs.Where(arm => arm.Designacao.Equals(designacao)).ToListAsync();
        }

        public async Task<List<Armazem>> GetAtivosAsync()
        {
            return await _objs.Where(arm => arm.Ativo.Equals(true)).ToListAsync();
        }
    }
}