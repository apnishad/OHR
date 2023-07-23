namespace Hotels.API.Models
{
    public partial class Rooms
    {
        public Rooms()
        {
            Images = new HashSet<Images>();
            RoomFacilitiesRelationships = new HashSet<RoomFacilitiesRelationships>();
        }
        public string Id{get;set;}
        public bool Available{get;set;}
        public string Description{get;set;}
        public int MaximumGuests{get;set;}
        public int Number{get;set;}
        public decimal Price{get;set;}
        public string RoomTypeId{get;set;}
        public string HotelId{get;set;}

        public HotelsInfo Hotel{get;set;}
        public RoomTypes RoomType{get;set;}
        public ICollection<Images>  Images{get;set;}
        public ICollection<RoomFacilitiesRelationships> RoomFacilitiesRelationships{get;set;} 

    }
}