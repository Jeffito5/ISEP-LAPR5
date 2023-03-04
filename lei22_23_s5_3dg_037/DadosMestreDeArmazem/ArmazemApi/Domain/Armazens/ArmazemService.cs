using System.Threading.Tasks;
using System.Collections.Generic;
using ArmazemApi.Domain.Shared;

namespace ArmazemApi.Domain.Armazens{

    public class ArmazemService{
        private readonly IUnitOfWork _unitOfWork;
        private readonly IArmazemRepository _repo;

        public ArmazemService(IUnitOfWork unitOfWork, IArmazemRepository repo)
        {
            _unitOfWork = unitOfWork;
            _repo = repo;
        }

         public async Task<List<ArmazemDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<ArmazemDto> listDto = list.ConvertAll<ArmazemDto>(arm => new ArmazemDto{Id = arm.Id.AsString(), Designacao = arm.Designacao,Longitude=arm.Coordenadas.Longitude,Latitude=arm.Coordenadas.Latitude,Altitude=arm.Coordenadas.Altitude, Endereco = arm.Endereco.AsString(),Ativo=arm.Ativo});

            return listDto;
        }

        public async Task<List<ArmazemDto>> GetAtivosAsync()
        {
            var list = await this._repo.GetAtivosAsync();
            
            List<ArmazemDto> listDto = list.ConvertAll<ArmazemDto>(arm => new ArmazemDto{Id = arm.Id.AsString(), Designacao = arm.Designacao,Longitude=arm.Coordenadas.Longitude,Latitude=arm.Coordenadas.Latitude,Altitude=arm.Coordenadas.Altitude, Endereco = arm.Endereco.AsString(),Ativo=arm.Ativo});

            return listDto;
        }


        public async Task<ArmazemDto> GetByIdAsync(ArmazemId id)
        {
            var arm = await this._repo.GetByIdAsync(id);
            
            if(arm == null)
                return null;

            return new ArmazemDto{Id = arm.Id.AsString(), Designacao = arm.Designacao,Longitude=arm.Coordenadas.Longitude,Latitude=arm.Coordenadas.Latitude,Altitude=arm.Coordenadas.Altitude, Endereco = arm.Endereco.AsString(),Ativo=arm.Ativo};
        }

        public async Task<List<ArmazemDto>> GetByDesignacaoAsync(String designacao)
        {
            var armList = await this._repo.GetByDesignacaoAsync(designacao);
            
            if(armList == null)
                return null;

            List<ArmazemDto> list= new List<ArmazemDto>();

            for(int i=0; i<armList.Count;i++){
                var arm = armList.ElementAt(i);
                list.Add(new ArmazemDto{Id = arm.Id.AsString(), Designacao = arm.Designacao,Longitude=arm.Coordenadas.Longitude,Latitude=arm.Coordenadas.Latitude,Altitude=arm.Coordenadas.Altitude, Endereco = arm.Endereco.AsString(),Ativo=arm.Ativo});
            }
            return list;
        }

        public async Task<ArmazemDto> AddAsync(ArmazemDto dto)
        {
            var arm = new Armazem(dto.Designacao, dto.Longitude,dto.Latitude,dto.Altitude,dto.Endereco,dto.Id,dto.Ativo);
            
            await this._repo.AddAsync(arm);

            await this._unitOfWork.CommitAsync();

            return new ArmazemDto {Id = arm.Id.AsString(), Designacao = arm.Designacao,Longitude=arm.Coordenadas.Longitude,Latitude=arm.Coordenadas.Latitude,Altitude=arm.Coordenadas.Altitude, Endereco = arm.Endereco.AsString(),Ativo=arm.Ativo};
        }

        public async Task<ArmazemDto> UpdateAsync(ArmazemDto dto)
        {
            var arm = await this._repo.GetByIdAsync(new ArmazemId(dto.Id)); 

            if (arm == null)
                return null;   

            // change all field
            arm.AlterarDesignacao(dto.Designacao);
            arm.AlterarAtivo(dto.Ativo);
            arm.AlterarCoordenadas(new Coordenadas(dto.Longitude,dto.Latitude,dto.Altitude));
            arm.AlterarEndereco(new Endereco(dto.Endereco));
            arm.AlterarAtivo(dto.Ativo);

            await this._unitOfWork.CommitAsync();

            return new ArmazemDto { Id = arm.Id.AsString(), Designacao = arm.Designacao,Longitude=arm.Coordenadas.Longitude,Latitude=arm.Coordenadas.Latitude,Altitude=arm.Coordenadas.Altitude, Endereco = arm.Endereco.AsString(),Ativo=arm.Ativo};
        }

         public async Task<ArmazemDto> InactivateAsync(ArmazemId id)
        {
            var arm = await this._repo.GetByIdAsync(id); 

            if (arm == null)
                return null;   

            // change all fields
            arm.MarcarComoInativo();
            
            await this._unitOfWork.CommitAsync();

            return new ArmazemDto {Id = arm.Id.AsString(), Designacao = arm.Designacao,Longitude=arm.Coordenadas.Longitude,Latitude=arm.Coordenadas.Latitude,Altitude=arm.Coordenadas.Altitude, Endereco = arm.Endereco.AsString(),Ativo=arm.Ativo};

            
        }

        public async Task<ArmazemDto> DeleteAsync(ArmazemId id)
        {
            var arm = await this._repo.GetByIdAsync(id); 

            if (arm == null)
                return null;   

            if (arm.Ativo)
                throw new BusinessRuleValidationException("Não é possivel eliminar um armazem ativo.");
            
            this._repo.Remove(arm);
            await this._unitOfWork.CommitAsync();

            return new ArmazemDto {Id = arm.Id.AsString(), Designacao = arm.Designacao,Longitude=arm.Coordenadas.Longitude,Latitude=arm.Coordenadas.Latitude,Altitude=arm.Coordenadas.Altitude, Endereco = arm.Endereco.AsString(),Ativo=arm.Ativo};
        }

    }
}