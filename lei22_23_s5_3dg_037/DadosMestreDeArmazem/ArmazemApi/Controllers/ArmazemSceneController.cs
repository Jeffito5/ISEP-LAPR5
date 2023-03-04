using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using ArmazemApi.Domain.Shared;
using ArmazemApi.Domain.Armazens.DadosScene;
using ArmazemApi.Domain.Armazens;

namespace ArmazemApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArmazemSceneController : ControllerBase
    {
        private readonly ArmazemSceneService _service;

        /*
            * Instancia de ArmazemService
        */
        private readonly ArmazemService _armazemService;

        public ArmazemSceneController(ArmazemSceneService service,ArmazemService armazemService)
        {
            _service = service;
            _armazemService = armazemService;
        }

        // GET: api/ArmazemScene
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArmazemSceneDTO>>> GetAll()
        {
            var result = await _service.GetAllAsync();
            if(result.Count==0||result==null){
                return NotFound();
            }
            return result;
        }

        // GET: api/ArmazemScene/A1
        [HttpGet("{id}")]
        public async Task<ActionResult<ArmazemSceneDTO>> GetGetById(String id)
        {
            var arm = await _service.GetByIdAsync(new ArmazemSceneId(id));

            if (arm == null)
            {
                return NotFound("O id definido não pertence a nenhum objeto");
            }

            return arm;
        }

        
        // GET: api/ArmazemScene/
        [HttpGet("{armazemId:alpha}")]
        public async Task<ActionResult<ArmazemSceneDTO>> GetGetByArmazemId(String armazemId){
            var arm = await _service.GetByArmazemIdAsync(armazemId);

            if (arm == null)
            {
                return NotFound("O id do armazém definido não pertence a nenhum objeto");
            }

            return arm;
        }

        // POST: api/Armazem
        [HttpPost]
        public async Task<ActionResult<ArmazemSceneDTO>> Create(ArmazemSceneDTO dto)
        {
            var armCor = _armazemService.GetByIdAsync(new ArmazemId(dto.ArmazemId));
            if(armCor.Result == null){
                return BadRequest("Armazém inexistente.");
            }
                
            var arm = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = arm.Id }, arm);
        }

        // PUT: api/Armazem/A5
        [HttpPut("{id}")]
        public async Task<ActionResult<ArmazemSceneDTO>> Update(String id, ArmazemSceneDTO dto)
        {
            var armCor = _armazemService.GetByIdAsync(new ArmazemId(dto.ArmazemId));
            if(armCor.Result == null)
                return BadRequest("Armazém inexistente.");

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
        public async Task<ActionResult<ArmazemSceneDTO>> HardDelete(String id)
        {
            try
            {
                var arm = await _service.DeleteAsync(new ArmazemSceneId(id));

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