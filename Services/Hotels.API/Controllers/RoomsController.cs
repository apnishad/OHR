using System.Security.Claims;
using Hotels.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hotels.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController:ControllerBase
    {
        private readonly HotelsContext _context;

        public RoomsController(HotelsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Rooms> GetRooms()
        {
            return _context.Rooms.Include(r=>r.RoomType);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRooms([FromRoute] string id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var room = await _context.Rooms.Include(r=>r.RoomType).Include(r=>r.Images).SingleOrDefaultAsync(r=>r.Id==id);
            if(room == null)
            {
                return NotFound();
            }
            return Ok(room);
        }

        [HttpGet("GetRoomsByHotel/{id}")]
        public IEnumerable<Rooms> GetRoomsByHotel([FromRoute] string id)
        {
            return _context.Rooms.Where(e=>e.HotelId == id);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutRooms([FromRoute] string id, [FromBody]Rooms room)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var claimsIdentity = User.Identity as ClaimsIdentity;
            room.HotelId = claimsIdentity.FindFirst("id").Value;
            if(id != room.Id)
            {
                return BadRequest();
            }
            _context.Entry(room).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException ex)
            {
                if(!RoomExists(id))
                {
                    return NoContent();
                }
                else
                {
                    throw ex;
                }
            }
            return NoContent();
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> PostRooms([FromBody][Bind("Id","Number","MaximumGuests","Price","RoomTypeId","Description")] Rooms room)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            room.Id = Guid.NewGuid().ToString();
            var claimsIdentity = User.Identity as ClaimsIdentity;
            room.HotelId = claimsIdentity.FindFirst("id").Value;
            _context.Rooms.Add(room);
            try{
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException ex)
            {
                if(RoomExists(room.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw ex;
                }
            }
            return CreatedAtAction("GetRooms", new {id=room.Id},room);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteRooms([FromRoute] string id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var room = await _context.Rooms.FindAsync(id);
            if(room==null)
            {
                return NotFound();
            }
            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();
            return Ok(room);

        }

        private bool RoomExists(string id)
        {
            return _context.Rooms.Any(e=>e.Id == id);
        }
    }
}