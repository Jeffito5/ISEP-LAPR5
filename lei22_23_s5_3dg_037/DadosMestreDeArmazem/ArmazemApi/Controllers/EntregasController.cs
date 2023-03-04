using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using ArmazemApi.Domain.Shared;
using ArmazemApi.Domain.Entregas;
using ArmazemApi.Domain.Armazens;

namespace ArmazemApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntregasController : ControllerBase
    {
        /*
            * Instancia de EntregaService
        */
        private readonly EntregaService _service;
        /*
            * Instancia de ArmazemService
        */
        private readonly ArmazemService _armazemService;
        /*
            * Construtor com os 2 servicos enviados por parametro
        */
        public EntregasController(EntregaService service, ArmazemService armazemService)
        {
            _service = service;
            _armazemService = armazemService;
        }

        // GET: api/Entregas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EntregaDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Entregas/5
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<EntregaDto>> GetGetById(Guid id)
        {
            var ent = await _service.GetByIdAsync(new EntregaId(id));

            if (ent == null)
            {
                return NotFound();
            }

            return ent;
        }

        // GET: api/Entregas/20220120/M05
        [HttpGet("{data}/{armazemId}")]
        public async Task<ActionResult<List<EntregaDto>>> GetByDataEIdArmazemAsync(string data, string armazemId)
        {
            var ent = await _service.GetyDataEIdArmazem(data, armazemId);

            if (ent == null)
            {
                return NotFound();
            }

            return ent;
        }

        // POST: api/Entregas
        [HttpPost]
        public async Task<ActionResult<EntregaDto>> Create(CriarEntregaDto dto)
        {
            var arm = _armazemService.GetByIdAsync(new ArmazemId(dto.ArmazemId));
            if (arm.Result == null)
                throw new BusinessRuleValidationException("Armazém inexistente.");

            var ent = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = ent.Id }, ent);
        }


        // PUT: api/Entregas/5
        [HttpPut("{id}")]
        public async Task<ActionResult<EntregaDto>> Update(Guid id, EntregaDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var ent = await _service.UpdateAsync(dto);

                if (ent == null)
                {
                    return NotFound();
                }
                return Ok(ent);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        // GET: api/Entrega/
        [HttpGet("{dataEntrega:int}")]
        public async Task<ActionResult<List<EntregaDto>>> GetGetByData(String dataEntrega)
        {
            var ent = await _service.GetByDataAsync(dataEntrega);

            if (ent == null)
            {
                return NotFound();
            }

            return ent;
        }

        // GET: api/Entrega/
        [HttpGet("{armazemId}")]
        public async Task<ActionResult<List<EntregaDto>>> GetGetByArmazemId(String armazemId)
        {
            var ent = await _service.GetByArmazemIdAsync(armazemId);

            if (ent == null)
            {
                return NotFound();
            }

            return ent;
        }

        // Inactivate: api/Entregas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<EntregaDto>> SoftDelete(Guid id)
        {
            var ent = await _service.InactivateAsync(new EntregaId(id));

            if (ent == null)
            {
                return NotFound();
            }

            return Ok(ent);
        }

        // DELETE: api/Entregas/5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<EntregaDto>> HardDelete(Guid id)
        {
            try
            {
                var ent = await _service.DeleteAsync(new EntregaId(id));

                if (ent == null)
                {
                    return NotFound();
                }

                return Ok(ent);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}