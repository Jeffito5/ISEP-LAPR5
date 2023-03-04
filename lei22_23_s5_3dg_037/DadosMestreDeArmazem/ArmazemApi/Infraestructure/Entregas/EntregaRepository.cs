using ArmazemApi.Domain.Entregas;
using ArmazemApi.Domain.Armazens;
using ArmazemApi.Infraestructure.Entregas;
using ArmazemApi.Infraestructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace ArmazemApi.Infraestructure.Entregas
{
    public class EntregaRepository : BaseRepository<Entrega, EntregaId>, IEntregaRepository
    {
        public EntregaRepository(ArmazemDbContext context) : base(context.Entregas)
        {

        }
        /*
            * Metodo que retorna uma lista de entregas filtradas pela data recebida por parametro
        */
        public async Task<List<Entrega>> GetByDataAsync(String data)
        {
            DataEntrega dataEntrega = new DataEntrega(new DateTime(Int32.Parse(data.Substring(0, 4)), Int32.Parse(data.Substring(4, 2)), Int32.Parse(data.Substring(6, 2))));
            return await _objs.Where(ent => ent.DataEntrega.Value.Equals(dataEntrega.Value)).ToListAsync();
        }

        public async Task<List<Entrega>> GetByDataEIdArmazemAsync(String data, String armazemId)
        {
            DataEntrega dataEntrega = new DataEntrega(new DateTime(Int32.Parse(data.Substring(0, 4)), Int32.Parse(data.Substring(4, 2)), Int32.Parse(data.Substring(6, 2))));
            return await _objs.Where(ent => ent.DataEntrega.Value.Equals(dataEntrega.Value) && ent.ArmazemID.Equals(new ArmazemId(armazemId))).ToListAsync();
        }

        public async Task<List<Entrega>> GetByArmazemIdAsync(String armazemId)
        {
            ArmazemId armazemId1 = new ArmazemId(armazemId);
            return await _objs.Where(ent => ent.ArmazemID.Equals(armazemId1)).ToListAsync();
        }
    }
}