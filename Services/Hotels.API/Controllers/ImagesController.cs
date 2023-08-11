using AutoMapper;
using Hotels.API.Models;
using Hotels.API.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hotels.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController:ControllerBase
    {
        private readonly HotelsContext _context;
        private readonly IMapper _mapper;
        public ImagesController(HotelsContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<ImageViewModel> GetImages()
        {
            var iData =_mapper.Map<IEnumerable<ImageViewModel>>(_context.Images);
            return iData;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetImages([FromRoute] string id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var image = await _context.Images.FindAsync(id);
            if(image == null)
            {
                return NotFound();
            }
            var iData =_mapper.Map<ImageViewModel>(image);
            return Ok(iData);
        }

        [HttpGet("GetImagesByRoomId/{id}")]
        public async Task<IActionResult> GetImagesByRoomId([FromRoute] string id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var image = await _context.Images.Where(img=>img.RoomId==id).ToArrayAsync();
            if(image == null)
            {
                return NotFound();
            }
            var iData =_mapper.Map<ImageViewModel[]>(image);
            return Ok(iData);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutImages([FromRoute] string id,[FromBody] ImageViewModel imagevm)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var image = _mapper.Map<Images>(imagevm);

            if(id != image.Id)
            {
                return BadRequest();
            }
            _context.Entry(image).State = EntityState.Modified;
            try{
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException ex)
            {
                if(!ImagesExists(id))
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
        public async Task<IActionResult> PostImages([FromBody] ImageViewModel imagevm)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var image = _mapper.Map<Images>(imagevm);
            if(_context.Images.Count()==0)
            {
                image.Id = "1";
            }
            else
            {
                
                image.Id = (_context.Images.Max(im=>Convert.ToInt32(im.Id)) + 1).ToString();
                Console.WriteLine(_context.Images.Max(im=>Convert.ToInt32(im.Id)));
            }
            _context.Images.Add(image);
            try{
                await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                if(ImagesExists(image.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw ex;
                }
            }
            return CreatedAtAction("GetImages",new {id=image.Id},image);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImages([FromRoute] string id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var image = await _context.Images.FindAsync(id);
            if(image==null)
            {
                return NotFound();
            }
            _context.Images.Remove(image);
            await _context.SaveChangesAsync();
            return Ok(image);
        }
        

        private bool ImagesExists(string id)
        {
            return _context.Images.Any(e=>e.Id == id);
        }
    }
}