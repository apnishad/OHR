using Microsoft.EntityFrameworkCore;

namespace Reviews.API.Models
{
    public partial class HotelReviewsContext:DbContext
    {
        public HotelReviewsContext()
        {

        }
        public HotelReviewsContext(DbContextOptions<HotelReviewsContext> options):base(options)
        {

        }

        public virtual DbSet<Reviews> Reviews{get;set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Reviews>(entity=>{
                entity.Property(c=>c.Id).HasColumnName("ID").ValueGeneratedNever();
                entity.Property(c=>c.HotelId).HasColumnName("HotelID").HasMaxLength(450);
            });
        }

    }
}