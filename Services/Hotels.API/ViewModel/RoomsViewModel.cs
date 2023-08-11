using Hotels.API.ViewModel;

namespace Hotels.API.Models
{
    public partial class RoomsViewModel
    {
        public RoomsViewModel()
        {
            Images = new HashSet<ImageViewModel>();
            RoomFacilitiesRelationships = new HashSet<RoomFacilitiesRelationships>();
        }
        public string Id{get;set;}
        public bool Available{get;set;}
        public string Description{get;set;}
        public int MaximumGuests{get;set;}
        public int Number{get;set;}
        public decimal Price{get;set;}
        public string RoomTypeId{get;set;}
        public int RoomLocId{get;set;}
        public string HotelId{get;set;}

        public HotelsInfo Hotel{get;set;}
        public RoomTypes RoomType{get;set;}
        public HotelAddress RoomLoc{get;set;}
        public ICollection<ImageViewModel>  Images{get;set;}
        public ICollection<RoomFacilitiesRelationships> RoomFacilitiesRelationships{get;set;} 

    }
}