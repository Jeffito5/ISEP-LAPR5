using ArmazemApi.Domain.Shared;

namespace ArmazemApi.Domain.Armazens.DadosScene
{
    public interface IArmazemSceneRepository: IRepository<ArmazemScene,ArmazemSceneId>
    {   

        Task<ArmazemScene> GetByArmazemIdAsync(String armazemId);
        
    }
}