using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Reviews.API.Models;
using Microsoft.Extensions.Caching.Distributed;
using Reviews.API.Services;
using Microsoft.EntityFrameworkCore;
using Reviews.API.Extensions;

namespace Reviews.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ReviewsController:ControllerBase
    {
        private readonly HotelReviewsContext _context;
        private readonly IDistributedCache _distributedCache;
        private readonly IIdentityService _identitySvc;
        private string CacheKey = "ReviewRedisCache";

        public ReviewsController(HotelReviewsContext context,IDistributedCache distributedCache)
        {
            _context = context;
            _distributedCache = distributedCache;
        }

        [HttpGet]
        public async Task<IEnumerable<Models.Reviews>> GetReviews([FromRoute] string hotelId)
        {
            IEnumerable<Models.Reviews> reviews = null;
            if(!string.IsNullOrEmpty(CacheKey))
            {
                reviews = await _distributedCache.GetAsync<IEnumerable<Models.Reviews>>(CacheKey);
            }
            else
            {
                reviews = _context.Reviews.Where(p=>p.HotelId.Equals(hotelId));
                await _distributedCache.SetAsync<IEnumerable<Models.Reviews>>(CacheKey,reviews,new DistributedCacheEntryOptions(){AbsoluteExpirationRelativeToNow=TimeSpan.FromHours(2)});
            }
            return reviews;
        }

        [HttpPost]
        public async Task<IActionResult> PostReviews([FromBody]Models.Reviews reviews)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _context.Reviews.Add(reviews);
            try
            {
                await _context.SaveChangesAsync();
                _distributedCache.Remove(CacheKey);
            }
            catch (DbUpdateException ex)
            {
                if(ReviewsExists(reviews.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw ex;
                }
            }
            return CreatedAtAction("GetReviews",new {id=reviews.Id},reviews);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReviews([FromRoute] string id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var reviews = await _context.Reviews.FindAsync(id);
            if(reviews == null)
            {
                return NotFound();
            }
            _context.Reviews.Remove(reviews);
            await _context.SaveChangesAsync();
            return Ok(reviews);
        }

        public bool ReviewsExists(string id)
        {
            return _context.Reviews.Any(r=>r.Id == id);
        }
    }
}