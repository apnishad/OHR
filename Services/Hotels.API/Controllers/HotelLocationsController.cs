using System.Security.Claims;
using Hotels.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hotels.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelLocationsController:ControllerBase
    {
        private readonly HotelsContext _context;

        public HotelLocationsController(HotelsContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetHotelLocations()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            string hotelId = claimsIdentity.FindFirst("id").Value;
            var hotelLoc = _context.HotelAddress.Where(ha=>ha.HotelId==hotelId);
            return Ok(hotelLoc);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetHotelLocation([FromRoute] int id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var hotelsInfo = await _context.HotelAddress.FindAsync(id);
            if(hotelsInfo == null)
            {
                return NotFound();
            }
            return Ok(hotelsInfo);
        }

        [HttpPut("{id}")]
        /*[Authorize(Policy="AdminRole")]*/
        public async Task<IActionResult> PutHotelLocations([FromRoute] int id, [FromBody] HotelAddress hotelAddress)
        {
 
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if(id != hotelAddress.Id)
            {
                return BadRequest();
            }
            var claimsIdentity = User.Identity as ClaimsIdentity;
            string hotelId = claimsIdentity.FindFirst("id").Value;
            hotelAddress.HotelId = hotelId;
            _context.Entry(hotelAddress).State = EntityState.Modified;
            try{
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException ex)
            {
                if(!HotelLocationsExists(id))
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
        /*[Authorize(Policy ="AdminRole")]*/
        [Authorize]
        public async Task<IActionResult> PostHotelLocations([FromBody] HotelAddress hotelAddress)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
        
            if(_context.HotelAddress.Count() == 0)
            {
                hotelAddress.Id = 1;
            }
            else
            {
                hotelAddress.Id = _context.HotelAddress.Max(ha=>ha.Id) + 1;
            }
            var claimsIdentity = User.Identity as ClaimsIdentity;
            string hotelId = claimsIdentity.FindFirst("id").Value;
            hotelAddress.HotelId = hotelId;
            _context.HotelAddress.Add(hotelAddress);
             try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException ex)
            {
                if(HotelLocationsExists(hotelAddress.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw ex;
                }
            }
            return CreatedAtAction("GetHotelLocation",new {id=hotelAddress.Id},hotelAddress);
        }

        [HttpDelete("{id}")]
        /*[Authorize(Policy="AdminRole")]*/
        public async Task<IActionResult> DeleteHotelLocations([FromRoute] int id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var hotelAddress = await _context.HotelAddress.FindAsync(id);
            if(hotelAddress == null)
            {
                return NotFound();
            }
            _context.HotelAddress.Remove(hotelAddress);
            await _context.SaveChangesAsync();
            return Ok(hotelAddress);

        }

        private bool HotelLocationsExists(int id)
        {
            return _context.HotelAddress.Any(e=>e.Id == id);
        }
    }
}