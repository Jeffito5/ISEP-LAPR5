using ArmazemApi.Domain.Armazens.DadosScene;
using ArmazemApi.Infraestructure.DadosScenes;
using ArmazemApi.Infraestructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace ArmazemApi.Infraestructure.DadosScenes
{
    public class ArmazemSceneRepository : BaseRepository<ArmazemScene, ArmazemSceneId>,IArmazemSceneRepository
    {
        public ArmazemSceneRepository(ArmazemDbContext context):base(context.ArmazemScenes)
        {
           
        }
        public async Task<ArmazemScene> GetByArmazemIdAsync(String armazemId){
             return await _objs.Where(arm => arm.ArmazemId.Equals(armazemId)).FirstAsync();
        }
    }
}