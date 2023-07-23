using Hotels.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hotels.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomTypesController:ControllerBase
    {
        private readonly HotelsContext _context;

        public RoomTypesController(HotelsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<RoomTypes> GetRoomTypes()
        {
            return _context.RoomTypes;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoomTypes([FromRoute] string id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var roomTypes = await _context.RoomTypes.FindAsync(id);
            if(roomTypes == null)
            {
                return NotFound();
            }
            return Ok(roomTypes);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutRoomTypes([FromRoute] string id,[FromBody] RoomTypes roomTypes)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if(id != roomTypes.Id)
            {
                return BadRequest();
            }
            _context.Entry(roomTypes).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException e)
            {
                if(!RoomTypesExist(id))
                {
                    return NotFound();
                }
                else
                {
                    throw e;
                }
            }
            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> PostRoomTypes([FromBody][Bind("BasePrice","Name","Description")]RoomTypes roomTypes)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if(_context.RoomTypes.Count() == 0)
            {
                roomTypes.Id = "1";
            }
            else
            {
                roomTypes.Id = (int.Parse(_context.RoomTypes.Max(rt=>rt.Id))+1).ToString();
            }
            _context.RoomTypes.Add(roomTypes);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException ex)
            {
                if(RoomTypesExist(roomTypes.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw ex;
                }
            }
            return CreatedAtAction("GetRoomTypes",new {id=roomTypes.Id},roomTypes);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoomTypes([FromRoute] string id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var roomTypes = await _context.RoomTypes.FindAsync(id);
            if(roomTypes == null)
            {
                return NotFound();
            }
            _context.RoomTypes.Remove(roomTypes);
            await _context.SaveChangesAsync();
            return Ok(roomTypes);
        }

        private bool RoomTypesExist(string id)
        {
            return _context.RoomTypes.Any(rt=>rt.Id == id);
        }
    }
}