using ArmazemApi.Domain.Shared;

namespace ArmazemApi.Domain.Armazens
{
    public interface IArmazemRepository: IRepository<Armazem,ArmazemId>
    {   

        Task<List<Armazem>> GetByDesignacaoAsync(String designacao);

        Task<List<Armazem>> GetAtivosAsync();
        
    }
}