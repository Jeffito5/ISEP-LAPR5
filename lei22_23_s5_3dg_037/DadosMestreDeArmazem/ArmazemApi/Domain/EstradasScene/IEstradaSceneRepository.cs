using ArmazemApi.Domain.Shared;

namespace ArmazemApi.Domain.EstradasScene
{
    public interface IEstradaSceneRepository: IRepository<EstradaScene,EstradaSceneId>
    {   
        Task<EstradaScene> GetByIdsArmazemAsync(String idArmazem1,String idArmazem2);
    }
}