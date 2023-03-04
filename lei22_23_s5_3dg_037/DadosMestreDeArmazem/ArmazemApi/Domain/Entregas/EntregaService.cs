//using System.Threading.Tasks;
//using System.Collections.Generic;
using ArmazemApi.Domain.Shared;
using ArmazemApi.Controllers;
using ArmazemApi.Domain.Armazens;
using ArmazemApi.Domain.Entregas;

namespace ArmazemApi.Domain.Entregas
{
    public class EntregaService
    {
        /*
            * Instancia de unit of work
        */
        private readonly IUnitOfWork _unitOfWork;
        /*
            * Instancia de repositorio de entrega repositorio
        */
        private readonly IEntregaRepository _repo;
        /*
            * Construtor com a unit of work e repositorio
        */
        public EntregaService(IUnitOfWork unitOfWork, IEntregaRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }
        /*
            * Metodo que retorna todas as entregas
        */
        public async Task<List<EntregaDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<EntregaDto> listDto = list.ConvertAll<EntregaDto>(entrega =>
                new EntregaDto(entrega.Id.AsGuid(), entrega.DataEntrega, entrega.MassaEntrega, entrega.TempoColocarEntrega, entrega.TempoRetirarEntrega, entrega.ArmazemID));

            return listDto;
        }

        public async Task<List<EntregaDto>> GetyDataEIdArmazem(string data, string idArmazem)
        {
            var list = await this._repo.GetByDataEIdArmazemAsync(data, idArmazem);

            if (list == null)
                return null;

            List<EntregaDto> listDto = list.ConvertAll<EntregaDto>(entrega =>
                new EntregaDto(entrega.Id.AsGuid(), entrega.DataEntrega, entrega.MassaEntrega, entrega.TempoColocarEntrega, entrega.TempoRetirarEntrega, entrega.ArmazemID));

            return listDto;
        }
        /*
            * Metodo que retorna a entrega procurando pelo id
        */
        public async Task<EntregaDto> GetByIdAsync(EntregaId id)
        {
            var entrega = await this._repo.GetByIdAsync(id);

            if (entrega == null)
                return null;

            return new EntregaDto(entrega.Id.AsGuid(), entrega.DataEntrega, entrega.MassaEntrega, entrega.TempoColocarEntrega, entrega.TempoRetirarEntrega, entrega.ArmazemID);
        }

        /*
           * Metodo que retorna a entrega procurando pelo id do armazém
       */
        public async Task<List<EntregaDto>> GetByArmazemIdAsync(String data)
        {
            var entList = await this._repo.GetByArmazemIdAsync(data);

            if (entList == null)
                return null;

            List<EntregaDto> list = new List<EntregaDto>();

            for (int i = 0; i < entList.Count; i++)
            {
                var entrega = entList.ElementAt(i);
                list.Add(new EntregaDto(entrega.Id.AsGuid(), entrega.DataEntrega, entrega.MassaEntrega, entrega.TempoColocarEntrega, entrega.TempoRetirarEntrega, entrega.ArmazemID));
            }
            return list;
        }


        /*
            * Metodo que retorna a entrega procurando pelo data
        */
        public async Task<List<EntregaDto>> GetByDataAsync(String data)
        {
            var entList = await this._repo.GetByDataAsync(data);

            if (entList == null)
                return null;

            List<EntregaDto> list = new List<EntregaDto>();

            for (int i = 0; i < entList.Count; i++)
            {
                var entrega = entList.ElementAt(i);
                list.Add(new EntregaDto(entrega.Id.AsGuid(), entrega.DataEntrega, entrega.MassaEntrega, entrega.TempoColocarEntrega, entrega.TempoRetirarEntrega, entrega.ArmazemID));
            }
            return list;
        }
        /*
            * Metodo que adiciona a entrega
        */
        public async Task<EntregaDto> AddAsync(CriarEntregaDto dto)
        {
            var entrega = new Entrega(dto.DataEntrega.ToString(), dto.MassaEntrega, dto.TempoColocarEntrega, dto.TempoRetirarEntrega, dto.ArmazemId);

            await this._repo.AddAsync(entrega);

            await this._unitOfWork.CommitAsync();

            return new EntregaDto(entrega.Id.AsGuid(), entrega.DataEntrega, entrega.MassaEntrega, entrega.TempoColocarEntrega, entrega.TempoRetirarEntrega, entrega.ArmazemID);
        }
        /*
            * Metodo que atualiza a entrega
        */
        public async Task<EntregaDto> UpdateAsync(EntregaDto dto)
        {
            var entrega = await this._repo.GetByIdAsync(new EntregaId(dto.Id));

            if (entrega == null)
                return null;

            // change all fields
            //entrega.AlterarDataEntrega(dto.DataEntrega);
            entrega.AlterarMassaEntrega(dto.MassaEntrega);
            entrega.AlterarTempoColocarEntrega(dto.TempoColocarEntrega);
            entrega.AlterarTempoRetirarEntrega(dto.TempoRetirarEntrega);

            await this._unitOfWork.CommitAsync();

            return new EntregaDto(entrega.Id.AsGuid(), entrega.DataEntrega, entrega.MassaEntrega, entrega.TempoColocarEntrega, entrega.TempoRetirarEntrega, entrega.ArmazemID);
        }
        /*
            * Metodo que coloca a entrega como inativa
        */

        public async Task<EntregaDto> InactivateAsync(EntregaId id)
        {
            var entrega = await this._repo.GetByIdAsync(id);

            if (entrega == null)
                return null;

            entrega.MarkAsInative();

            await this._unitOfWork.CommitAsync();

            return new EntregaDto(entrega.Id.AsGuid(), entrega.DataEntrega, entrega.MassaEntrega, entrega.TempoColocarEntrega, entrega.TempoRetirarEntrega, entrega.ArmazemID);
        }
        /*
            * Metodo que elimina a entrega
        */

        public async Task<EntregaDto> DeleteAsync(EntregaId id)
        {
            var entrega = await this._repo.GetByIdAsync(id);

            if (entrega == null)
                return null;

            if (entrega.Active)
                //throw new BusinessRuleValidationException("Não é possível eliminar uma entrega ativa.");

                this._repo.Remove(entrega);
            await this._unitOfWork.CommitAsync();

            return new EntregaDto(entrega.Id.AsGuid(), entrega.DataEntrega, entrega.MassaEntrega, entrega.TempoColocarEntrega, entrega.TempoRetirarEntrega, entrega.ArmazemID);
        }
    }
}