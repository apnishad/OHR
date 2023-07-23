
using Microsoft.EntityFrameworkCore;

namespace Booking.API.Models
{
    public partial class HotelBookingsContext:DbContext
    {
        public HotelBookingsContext()
        {

        }
        public HotelBookingsContext(DbContextOptions<HotelBookingsContext> options):base(options)
        {

        }

        public virtual DbSet<BookingsInfo> BookingsInfo{get;set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BookingsInfo>(entity=>{
                entity.Property(c=>c.Id).HasColumnName("ID").ValueGeneratedNever();
                entity.Property(c=>c.CustomerName).IsRequired();
                entity.Property(c=>c.HotelName).HasMaxLength(450);
                entity.Property(c=>c.RoomNo).HasMaxLength(50);
            });
        }

        
    }
}