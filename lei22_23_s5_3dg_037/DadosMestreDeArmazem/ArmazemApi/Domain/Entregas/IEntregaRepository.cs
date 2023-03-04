using System;
using ArmazemApi.Domain.Shared;
using ArmazemApi.Domain.Armazens;

namespace ArmazemApi.Domain.Entregas
{
    public interface IEntregaRepository : IRepository<Entrega, EntregaId>
    {
        /*
            * Metodo que retorna a entrega pela data
        */

        Task<List<Entrega>> GetByDataAsync(String data);

        Task<List<Entrega>> GetByDataEIdArmazemAsync(String data, String armazemId);

        Task<List<Entrega>> GetByArmazemIdAsync(String data);
    }
}