using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Booking.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Booking.API.Controllers
{
    [Route("api/[controller]")]
    /*[Authorize(Policy="ApiUser")]*/
    [ApiController]
    public class BookingsController:ControllerBase
    {
        private readonly HotelBookingsContext _context;

        public BookingsController(HotelBookingsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<BookingsInfo> GetBookingsInfo()
        {
            return _context.BookingsInfo;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookingsInfo([FromRoute] string id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var booking = await _context.BookingsInfo.FindAsync(id);
            if(booking == null)
            {
                return NotFound();
            }
            return Ok(booking);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookingsInfo([FromRoute] string id, [FromBody] BookingsInfo booking)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if(id != booking.Id)
            {
                return BadRequest();
            }
            _context.Entry(booking).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if(!BookingsInfoExists(id))
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
        public async Task<IActionResult> PostBookingsInfo([FromBody]BookingsInfo booking)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _context.BookingsInfo.Add(booking);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if(BookingsInfoExists(booking.Id))
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                else
                    throw ex;
            }
            return CreatedAtAction("GetBookingsInfo", new {id=booking.Id},booking);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookingsInfo([FromRoute] string id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var booking = await _context.BookingsInfo.FindAsync(id);
            if(booking == null)
            {
                return NotFound();
            }
            _context.BookingsInfo.Remove(booking);
            await _context.SaveChangesAsync();
            return Ok(booking);
        }

        private bool BookingsInfoExists(string id)
        {
            return _context.BookingsInfo.Any(b=>b.Id == id);
        }
    }
}