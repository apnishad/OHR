using Hotels.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hotels.API.Controllers
{
    [Route("api/[controller]")]
    public class FacilitiesController:ControllerBase
    {
        private readonly HotelsContext _context; 
        public FacilitiesController(HotelsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Facilities> GetFacilities()
        {
            return _context.Facilities;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFacilities([FromRoute] string id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var facilities = await _context.Facilities.FindAsync(id);
            if(facilities==null)
            {
                return NotFound();
            }
            return Ok(facilities);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutFacilities([FromRoute] string id, [FromBody]Facilities facilities)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if(id != facilities.Id)
            {
                return BadRequest();
            }
            _context.Entry(facilities).State =EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException ex)
            {
                if(!FacilitiesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw ex;
                }
            }
            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> PostFacilities([FromBody] Facilities facilities)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if(_context.Facilities.Count() == 0)
            {
                facilities.Id = "1";
            }
            else
            {
                facilities.Id = (int.Parse(_context.Facilities.Max(rt=>rt.Id))+1).ToString();
            }
            _context.Facilities.Add(facilities);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException ex)
            {
                if(FacilitiesExists(facilities.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw ex;
                }
            }
            return CreatedAtAction("GetFacilities",new {id=facilities.Id},facilities);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteFacilities([FromRoute] string id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var facilities = await _context.Facilities.FindAsync(id);
            if(facilities==null)
            {
                return NotFound();
            }
            _context.Facilities.Remove(facilities);
            await _context.SaveChangesAsync();
            return Ok(facilities);
        }

        private bool FacilitiesExists(string id)
        {
            return _context.Facilities.Any(e=>e.Id == id);
        }
    }
}