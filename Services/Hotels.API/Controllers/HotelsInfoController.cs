using System.Security.Claims;
using Hotels.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hotels.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelsInfoController:ControllerBase
    {
        private readonly HotelsContext _context;

        public HotelsInfoController(HotelsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<HotelsInfo> FindHotelsInCity(string city, DateTime startDate, DateTime endDate)
        {
            var hotelNames = from hotels in _context.HotelsInfo join address in _context.HotelAddress on hotels.HotelId equals address.HotelId join room in _context.Rooms on hotels.HotelId equals room.HotelId where address.City.Equals(city) && room.Available == true select hotels;
            return hotelNames;
        }

        [HttpGet("HotelsList")]
        public IActionResult GetHotelsInfo()
        {
            var hotels = _context.HotelsInfo;
            return Ok(hotels);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetHotelsInfo([FromRoute] string id)
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            Console.WriteLine($"UserType : {claimsIdentity.FindFirst("UserType")}");
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var hotelsInfo = await _context.HotelsInfo.FindAsync(id);
            if(hotelsInfo == null)
            {
                return NotFound();
            }
            return Ok(hotelsInfo);
        }

        [HttpGet("GetLoggedHotelsInfo")]
        [Authorize]
        public async Task<IActionResult> GetLoggedHotelsInfo()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            string id = claimsIdentity.FindFirst("id").Value;
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var hotelsInfo = await _context.HotelsInfo.Include(ht=>ht.HotelAddress).SingleAsync(ht=>ht.HotelId==id);
            //await _context.HotelsInfo.FindAsync(id);
            
            if(hotelsInfo == null)
            {
                return NotFound();
            }
            return Ok(hotelsInfo);
        }

        [HttpPut("{id}")]
        /*[Authorize(Policy="AdminRole")]*/
        public async Task<IActionResult> PutHotelsInfo([FromRoute] string id, [FromBody] HotelsInfo hotelsInfo)
        {
 
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if(id != hotelsInfo.HotelId)
            {
                return BadRequest();
            }
            //_context.Entry(hotelsInfo).State = EntityState.Modified;
            //Console.WriteLine(hotelsInfo.HotelAddress.ElementAt(0).Address);
            var eHt = _context.HotelsInfo.Include(ht=>ht.HotelAddress).Single(h=>h.HotelId == hotelsInfo.HotelId);
            System.Console.WriteLine($"HID -- {hotelsInfo.HotelAddress.ToList()[0].HotelId}");
            if(eHt != null){
                _context.Entry(eHt).CurrentValues.SetValues(hotelsInfo);

                foreach(var ext in eHt.HotelAddress.ToList())
                {
                    if(!hotelsInfo.HotelAddress.Any(h=>h.Id == ext.Id))
                    {
                        _context.HotelAddress.Remove(ext);
                    }
                }

                foreach(var cm in hotelsInfo.HotelAddress)
                {
                    var eCh = eHt.HotelAddress.Where(et=>et.Id==cm.Id && et.Id != default(int)).SingleOrDefault();

                    if(eCh!=null){
                        _context.Entry(eCh).CurrentValues.SetValues(cm);
                    }
                    else{
                        var addr = new HotelAddress{
                            Id = cm.Id,
                            Address = cm.Address,
                            Location = cm.Location,
                            City = cm.City,
                            HotelId = cm.HotelId
                        };
                        eHt.HotelAddress.Add(addr);
                    }
                    System.Console.WriteLine($"hID --- {cm.HotelId}");
                    System.Console.WriteLine($"hID --- {_context.HotelAddress.ToList()[0].HotelId}");
                }   
            }
            try{
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException ex)
            {
                if(!HotelInfoExists(id))
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
        public async Task<IActionResult> PostHotelsInfo([FromBody] HotelsInfo hotelsInfo)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var claimsIdentity = User.Identity as ClaimsIdentity;
            hotelsInfo.HotelId = claimsIdentity.FindFirst("id").Value;
            if(hotelsInfo.HotelAddress.Count() != 0)
            {
                foreach(var ht in hotelsInfo.HotelAddress)
                {
                    if(_context.HotelAddress.Count() == 0)
                    {
                        ht.Id = 1;
                    }
                    else
                    {
                        ht.Id = _context.HotelAddress.Max(ha=>ha.Id) + 1;
                    }
                }

            }
            _context.HotelsInfo.Add(hotelsInfo);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetHotelsInfo",new {id=hotelsInfo.HotelId},hotelsInfo);
        }

        [HttpDelete("{id}")]
        /*[Authorize(Policy="AdminRole")]*/
        public async Task<IActionResult> DeleteHotelsInfo([FromRoute] string id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var hotelsInfo = await _context.HotelsInfo.FindAsync(id);
            if(hotelsInfo == null)
            {
                return NotFound();
            }
            _context.HotelsInfo.Remove(hotelsInfo);
            await _context.SaveChangesAsync();
            return Ok(hotelsInfo);

        }

        private bool HotelInfoExists(string id)
        {
            return _context.HotelsInfo.Any(e=>e.HotelId == id);
        }
    }
}