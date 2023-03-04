using System.Threading.Tasks;
using System.Collections.Generic;
using ArmazemApi.Domain.Shared;

namespace ArmazemApi.Domain.EstradasScene{

    public class EstradaSceneService{
        private readonly IUnitOfWork _unitOfWork;
        private readonly IEstradaSceneRepository _repo;


        public EstradaSceneService(IUnitOfWork unitOfWork, IEstradaSceneRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

         public async Task<List<EstradaSceneDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<EstradaSceneDto> listDto = list.ConvertAll<EstradaSceneDto>(arm => new EstradaSceneDto{Id = arm.Id.AsString(), IdArmazem1 = arm.Armazem1.AsString(),IdArmazem2=arm.Armazem2.AsString(),Largura=arm.Largura,EstradaUrl=arm.EstradaUrl.url});

            return listDto;
        }


        public async Task<EstradaSceneDto> GetByIdAsync(EstradaSceneId id)
        {
            var est = await this._repo.GetByIdAsync(id);
            
            if(est == null)
                return null;

            return new EstradaSceneDto{Id = est.Id.AsString(), IdArmazem1 = est.Armazem1.AsString(),IdArmazem2=est.Armazem2.AsString(),Largura=est.Largura,EstradaUrl=est.EstradaUrl.url};
        }

        public async Task<EstradaSceneDto> GetByIdsArmazemAsync(String idArmazem1,String idArmazem2)
        {
            var est = await this._repo.GetByIdsArmazemAsync(idArmazem1,idArmazem2);
            
            if(est == null)
                return null;

            return new EstradaSceneDto{Id = est.Id.AsString(), IdArmazem1 = est.Armazem1.AsString(),IdArmazem2=est.Armazem2.AsString(),Largura=est.Largura,EstradaUrl=est.EstradaUrl.url};
        }

        public async Task<EstradaSceneDto> AddAsync(EstradaSceneDto dto)
        {
            var est = new EstradaScene(dto.Largura, dto.EstradaUrl,dto.IdArmazem1,dto.IdArmazem2);
            
            await this._repo.AddAsync(est);

            await this._unitOfWork.CommitAsync();

            return new EstradaSceneDto{Id = est.Id.AsString(), IdArmazem1 = est.Armazem1.AsString(),IdArmazem2=est.Armazem2.AsString(),Largura=est.Largura,EstradaUrl=est.EstradaUrl.url};
        }

        public async Task<EstradaSceneDto> UpdateAsync(EstradaSceneDto dto)
        {
            var est = await this._repo.GetByIdAsync(new EstradaSceneId(dto.Id)); 

            if (est == null)
                return null;   

            // change all field
            est.AlterarLarguraEstrada(dto.Largura);
            est.AlterarTexturaEstrada(dto.EstradaUrl);

            await this._unitOfWork.CommitAsync();

            return new EstradaSceneDto{Id = est.Id.AsString(), IdArmazem1 = est.Armazem1.AsString(),IdArmazem2=est.Armazem2.AsString(),Largura=est.Largura,EstradaUrl=est.EstradaUrl.url};
        }

        public async Task<EstradaSceneDto> DeleteAsync(EstradaSceneId id)
        {
            var est = await this._repo.GetByIdAsync(id); 

            if (est == null)
                return null;
            
            this._repo.Remove(est);
            await this._unitOfWork.CommitAsync();

            return new EstradaSceneDto{Id = est.Id.AsString(), IdArmazem1 = est.Armazem1.AsString(),IdArmazem2=est.Armazem2.AsString(),Largura=est.Largura,EstradaUrl=est.EstradaUrl.url};
        }

    }
}