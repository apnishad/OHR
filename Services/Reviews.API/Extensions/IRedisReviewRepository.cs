namespace Reviews.API.Extensions
{
    interface IRedisReviewRepository
    {
        Task<IEnumerable<Reviews.API.Models.Reviews>> GetReviewsAsync(string hotelId);
        Task<Reviews.API.Models.Reviews> UpdateReviewsAsync(Reviews.API.Models.Reviews reviews);
        Task<bool> DeleteReviewsAsync(string id);
        IEnumerable<string> GetUsers();
    }
}