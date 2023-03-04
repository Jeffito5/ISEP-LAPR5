using System.Threading.Tasks;
using System.Collections.Generic;
using ArmazemApi.Domain.Shared;

namespace ArmazemApi.Domain.Armazens.DadosScene{

    public class ArmazemSceneService{
        private readonly IUnitOfWork _unitOfWork;
        private readonly IArmazemSceneRepository _repo;


        public ArmazemSceneService(IUnitOfWork unitOfWork, IArmazemSceneRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

         public async Task<List<ArmazemSceneDTO>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<ArmazemSceneDTO> listDto = list.ConvertAll<ArmazemSceneDTO>(arm => new ArmazemSceneDTO{Id = arm.Id.AsString(), ArmazemId = arm.ArmazemId.AsString(),TexturaArmazemUrl=arm.TexturaArmazemUrl.url,EstradaUrl=arm.EstradaUrl.url,RotundaUrl=arm.RotundaUrl.url});

            return listDto;
        }


        public async Task<ArmazemSceneDTO> GetByIdAsync(ArmazemSceneId id)
        {
            var arm = await this._repo.GetByIdAsync(id);
            
            if(arm == null)
                return null;

            return new ArmazemSceneDTO{Id = arm.Id.AsString(), ArmazemId = arm.ArmazemId.AsString(),TexturaArmazemUrl=arm.TexturaArmazemUrl.url,EstradaUrl=arm.EstradaUrl.url,RotundaUrl=arm.RotundaUrl.url};
        }

        public async Task<ArmazemSceneDTO> GetByArmazemIdAsync(String designacao)
        {
            var arm = await this._repo.GetByArmazemIdAsync(designacao);
            
            if(arm == null)
                return null;

            return new ArmazemSceneDTO{Id = arm.Id.AsString(), ArmazemId = arm.ArmazemId.AsString(),TexturaArmazemUrl=arm.TexturaArmazemUrl.url,EstradaUrl=arm.EstradaUrl.url,RotundaUrl=arm.RotundaUrl.url};
        }

        public async Task<ArmazemSceneDTO> AddAsync(ArmazemSceneDTO dto)
        {
            var arm = new ArmazemScene(dto.ArmazemId, dto.RotundaUrl,dto.EstradaUrl,dto.TexturaArmazemUrl);
            
            await this._repo.AddAsync(arm);

            await this._unitOfWork.CommitAsync();

            return new ArmazemSceneDTO{Id = arm.Id.AsString(), ArmazemId = arm.ArmazemId.AsString(),TexturaArmazemUrl=arm.TexturaArmazemUrl.url,EstradaUrl=arm.EstradaUrl.url,RotundaUrl=arm.RotundaUrl.url};
        }

        public async Task<ArmazemSceneDTO> UpdateAsync(ArmazemSceneDTO dto)
        {
            var arm = await this._repo.GetByIdAsync(new ArmazemSceneId(dto.Id)); 

            if (arm == null)
                return null;   

            // change all field
            arm.alterarEstradaUrl(dto.EstradaUrl);
            arm.alterarRotundaUrl(dto.RotundaUrl);
            arm.alterarTexturaArmazemUrl(dto.TexturaArmazemUrl);

            await this._unitOfWork.CommitAsync();

            return new ArmazemSceneDTO{Id = arm.Id.AsString(), ArmazemId = arm.ArmazemId.AsString(),TexturaArmazemUrl=arm.TexturaArmazemUrl.url,EstradaUrl=arm.EstradaUrl.url,RotundaUrl=arm.RotundaUrl.url};
        }

        public async Task<ArmazemSceneDTO> DeleteAsync(ArmazemSceneId id)
        {
            var arm = await this._repo.GetByIdAsync(id); 

            if (arm == null)
                return null;
            
            this._repo.Remove(arm);
            await this._unitOfWork.CommitAsync();

            return new ArmazemSceneDTO{Id = arm.Id.AsString(), ArmazemId = arm.ArmazemId.AsString(),TexturaArmazemUrl=arm.TexturaArmazemUrl.url,EstradaUrl=arm.EstradaUrl.url,RotundaUrl=arm.RotundaUrl.url};
        }

    }
}