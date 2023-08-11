
using Microsoft.EntityFrameworkCore;

namespace Hotels.API.Models
{
    public partial class HotelsContext:DbContext
    {
        public HotelsContext(DbContextOptions<HotelsContext> options):base(options)
        {

        }

        public DbSet<Facilities> Facilities{get;set;}
        public DbSet<HotelAddress> HotelAddress{get;set;}
        public DbSet<HotelsInfo> HotelsInfo{get;set;}
        public DbSet<Images> Images{get;set;}
        public DbSet<ItemImageRelationships> ItemImageRelationships{get;set;}
        public DbSet<RoomFacilitiesRelationships> RoomFacilitiesRelationships{get;set;}
        public DbSet<Rooms> Rooms{get;set;}
        public DbSet<RoomTypes> RoomTypes{get;set;}
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Facilities>(entity=>{
                entity.Property(c=>c.Id).HasColumnName("ID").ValueGeneratedNever();
                entity.Property(c=>c.ICon).IsRequired();
                entity.Property(c=>c.Name).IsRequired();
            });

            modelBuilder.Entity<HotelAddress>(entity=>{
                entity.HasKey(p=>p.Id);
                entity.Property(c=>c.Id).ValueGeneratedNever();
                entity.Property(c=>c.Address).HasMaxLength(100);
                entity.Property(c=>c.City).HasMaxLength(100);
                entity.Property(c=>c.Location).HasMaxLength(100);

                entity.HasOne(nv=>nv.Hotel).WithMany(nv=>nv.HotelAddress).HasPrincipalKey(f=>f.HotelId).HasForeignKey(fk=>fk.HotelId).HasConstraintName("fk_hoteladdress_hotelinfo");
            });

            modelBuilder.Entity<HotelsInfo>(entity=>{
                entity.HasKey(ky=>ky.HotelId);
                entity.Property(c=>c.HotelId).HasColumnName("HotelID").ValueGeneratedNever();
                entity.Property(c=>c.Description).HasMaxLength(50);
                entity.Property(c=>c.HotelName).HasMaxLength(50);
            });

            modelBuilder.Entity<Images>(entity=>{
                entity.Property(c=>c.Id).HasColumnName("ID").ValueGeneratedNever();
                entity.Property(c=>c.RoomId).HasColumnName("RoomID").HasMaxLength(450);

                entity.HasOne(d=>d.Room).WithMany(wm=>wm.Images).HasForeignKey(ky=>ky.RoomId);
            });

            modelBuilder.Entity<ItemImageRelationships>(entity=>{
                entity.HasKey(e=>new {e.ItemId,e.ImageId});
                entity.Property(c=>c.ItemId).HasColumnName("ItemID");
                entity.Property(c=>c.ImageId).HasColumnName("ImageID");

                entity.HasOne(ho=>ho.Image).WithMany(wm=>wm.ItemImageRelationships).HasForeignKey(fk=>fk.ImageId);
            });

            modelBuilder.Entity<RoomFacilitiesRelationships>(entity=>{
                entity.HasKey(e=>new {e.RoomId, e.FeatureId});
                entity.Property(e=>e.RoomId).HasColumnName("RoomID");
                entity.Property(e=>e.FeatureId).HasColumnName("FeatureID");

                entity.HasOne(d=>d.Feature).WithMany(p=>p.RoomFacilitiesRelationships).HasForeignKey(d=>d.FeatureId).HasConstraintName("FK_RoomFeatureRealtionship_Features_RoomID");
            });

            modelBuilder.Entity<Rooms>(entity=>{
                entity.Property(c=>c.Id).HasColumnName("ID").ValueGeneratedNever();
                entity.Property(c=>c.Description).IsRequired();
                entity.Property(c=>c.HotelId).HasColumnName("HotelID");
                entity.Property(c=>c.RoomTypeId).HasColumnName("RoomTypeID").HasMaxLength(450);

                entity.HasOne(ho=>ho.Hotel).WithMany(wm=>wm.Rooms).HasForeignKey(fk=>fk.HotelId).HasConstraintName("FK_Rooms_Hotels");
                entity.HasOne(ho=>ho.RoomType).WithMany(wm=>wm.Rooms).HasForeignKey(fk=>fk.RoomTypeId).OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(ho=>ho.RoomLoc).WithMany(wm=>wm.Rooms).HasForeignKey(fk=>fk.RoomLocId).OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<RoomTypes>(entity=>{
                entity.Property(c=>c.Id).HasColumnName("ID").ValueGeneratedNever();
                entity.Property(e=>e.Description).IsRequired();
                entity.Property(c=>c.Name).IsRequired();
            });
        }


    }
}