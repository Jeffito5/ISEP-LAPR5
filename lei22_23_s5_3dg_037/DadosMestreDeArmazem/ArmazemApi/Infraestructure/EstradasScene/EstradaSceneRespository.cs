using ArmazemApi.Domain.EstradasScene;
using ArmazemApi.Infraestructure.DadosScenes;
using ArmazemApi.Infraestructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace ArmazemApi.Infraestructure.EstradasScene
{
    public class EstradaSceneRepository : BaseRepository<EstradaScene, EstradaSceneId>,IEstradaSceneRepository
    {
        public EstradaSceneRepository(ArmazemDbContext context):base(context.EstradaScenes)
        {
           
        }
        public async Task<EstradaScene> GetByIdsArmazemAsync(String idArmazem1,String idArmazem2){
             return await _objs.Where(arm => arm.Armazem1.Equals(idArmazem1)&&arm.Armazem2.Equals(idArmazem2)).FirstAsync();
        }
    }
}