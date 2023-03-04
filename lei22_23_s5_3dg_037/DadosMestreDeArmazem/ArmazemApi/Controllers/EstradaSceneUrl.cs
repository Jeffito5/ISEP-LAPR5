using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using ArmazemApi.Domain.Shared;
using ArmazemApi.Domain.EstradasScene;
using ArmazemApi.Domain.Armazens;

namespace ArmazemApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstradaSceneController : ControllerBase
    {
        private readonly EstradaSceneService _service;

        /*
            * Instancia de ArmazemService
        */
        private readonly ArmazemService _armazemService;

        public EstradaSceneController(EstradaSceneService service,ArmazemService armazemService)
        {
            _service = service;
            _armazemService = armazemService;
        }

        // GET: api/ArmazemScene
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EstradaSceneDto>>> GetAll()
        {
            var result = await _service.GetAllAsync();
            if(result==null){
                return NotFound();
            }

            if(result.Count==0){
                return NoContent();
            }

            return result;
        }

        // GET: api/ArmazemScene/A1
        [HttpGet("{id}")]
        public async Task<ActionResult<EstradaSceneDto>> GetGetById(String id)
        {
            var arm = await _service.GetByIdAsync(new EstradaSceneId(id));

            if (arm == null)
            {
                return NotFound("O id definido não pertence a nenhum objeto");
            }

            return arm;
        }

        
        // GET: api/ArmazemScene/
        [HttpGet("{armazemId1}/{armazemId2}")]
        public async Task<ActionResult<EstradaSceneDto>> GetGetByArmazemId(String armazemId1,String armazemId2){
            
            var armCor = _armazemService.GetByIdAsync(new ArmazemId(armazemId1));
            if(armCor.Result == null)
                return BadRequest("O primeiro armazém inexistente.");

            armCor = _armazemService.GetByIdAsync(new ArmazemId(armazemId2));
            if(armCor.Result == null)
                return BadRequest("O segundo armazém inexistente.");
            
            var arm = await _service.GetByIdsArmazemAsync(armazemId1,armazemId2);

            if (arm == null)
            {
                return NotFound("O id do armazém definido não pertence a nenhum objeto");
            }

            return arm;
        }

        // POST: api/Armazem
        [HttpPost]
        public async Task<ActionResult<EstradaSceneDto>> Create(EstradaSceneDto dto)
        {
            var armCor = _armazemService.GetByIdAsync(new ArmazemId(dto.IdArmazem1));
            if(armCor.Result == null)
                return BadRequest("O primeiro armazém inexistente.");

            armCor = _armazemService.GetByIdAsync(new ArmazemId(dto.IdArmazem2));
            if(armCor.Result == null)
                return BadRequest("O segundo armazém inexistente.");

                
            var arm = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = arm.Id }, arm);
        }

        // PUT: api/Armazem/A5
        [HttpPut("{id}")]
        public async Task<ActionResult<EstradaSceneDto>> Update(String id, EstradaSceneDto dto)
        {
            var armCor = _armazemService.GetByIdAsync(new ArmazemId(dto.IdArmazem1));
            if(armCor.Result == null)
                return BadRequest("O primeiro armazém inexistente.");

            armCor = _armazemService.GetByIdAsync(new ArmazemId(dto.IdArmazem2));
            if(armCor.Result == null)
                return BadRequest("O segundo armazém inexistente.");

            if (id != dto.Id)
            {
                return BadRequest("O id não correspondem");
            }

            try
            {
                var arm = await _service.UpdateAsync(dto);
                
                if (arm == null)
                {
                    return NotFound();
                }
                return Ok(arm);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // DELETE: api/ArmazemScene/A5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<EstradaSceneDto>> HardDelete(String id)
        {
            try
            {
                var arm = await _service.DeleteAsync(new EstradaSceneId(id));

                if (arm == null)
                {
                    return NotFound("O id de ArmazemScene definido não corresponde a nenhum objeto.");
                }

                return Ok(arm);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }
    }
}