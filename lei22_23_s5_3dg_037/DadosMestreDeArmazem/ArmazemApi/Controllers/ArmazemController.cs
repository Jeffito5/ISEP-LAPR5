using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using ArmazemApi.Domain.Shared;
using ArmazemApi.Domain.Armazens;

namespace ArmazemApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArmazemController : ControllerBase
    {
        private readonly ArmazemService _service;

        public ArmazemController(ArmazemService service)
        {
            _service = service;
        }

        // GET: api/Armazem
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArmazemDto>>> GetAll()
        {
            var result = await _service.GetAllAsync();

            if (result.Count == 0 || result == null)
            {
                return NotFound("Nenhum armazém encontra-se na base de dados.");
            }
            return result;
        }

        // GET: api/Armazem
        [HttpGet("Ativos/")]
        public async Task<ActionResult<IEnumerable<ArmazemDto>>> GetAtivos()
        {
            var result = await _service.GetAtivosAsync();

            if (result.Count == 0 || result == null)
            {
                return NotFound("Nenhum armazém encontra-se na base de dados.");
            }
            return result;
        }

        // GET: api/Armazem/A1
        [HttpGet("{id}")]
        public async Task<ActionResult<ArmazemDto>> GetGetById(String id)
        {
            var arm = await _service.GetByIdAsync(new ArmazemId(id));

            if (arm == null)
            {
                return NotFound("Nenhum armazém têm id correspondente ao recebido.");
            }

            return arm;
        }


        // GET: api/Armazem/
        [HttpGet("{designacao:alpha}")]
        public async Task<ActionResult<List<ArmazemDto>>> GetGetByDesignacao(String designacao)
        {
            var arm = await _service.GetByDesignacaoAsync(designacao);

            if (arm == null || arm.Count == 0)
            {
                return NotFound("Nenhum armazém têm a designação correspondente ao recebido.");
            }

            return arm;
        }

        // POST: api/Armazem
        [HttpPost]
        public async Task<ActionResult<ArmazemDto>> Create(ArmazemDto dto)
        {
            var arm = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = arm.Id }, arm);
        }




        // PUT: api/Armazem/A5
        [HttpPut("{id}")]
        public async Task<ActionResult<ArmazemDto>> Update(String id, ArmazemDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest("Não pode-se alterar o id do armazém");
            }

            try
            {
                var arm = await _service.UpdateAsync(dto);

                if (arm == null)
                {
                    return NotFound("O armazém não foi encontrado.");
                }
                return Ok(arm);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }



        // Inactivate: api/Armazem/A5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ArmazemDto>> SoftDelete(String id)
        {
            var arm = await _service.InactivateAsync(new ArmazemId(id));

            if (arm == null)
            {
                return NotFound("O armazém não foi encontrado.");
            }

            return Ok(arm);
        }

        // DELETE: api/Armazem/A5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<ArmazemDto>> HardDelete(String id)
        {
            try
            {
                var arm = await _service.DeleteAsync(new ArmazemId(id));

                if (arm == null)
                {
                    return NotFound("O armazém não foi encontrado.");
                }

                return Ok(arm);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}