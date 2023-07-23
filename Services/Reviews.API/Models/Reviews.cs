namespace Reviews.API.Models
{
    public partial class Reviews
    {
        public string Id {get;set;}
        public string Description{get;set;}
        public string ReviewerEmail{get;set;}
        public string ReviwerName{get;set;}
        public string HotelId{get;set;}
    }
}