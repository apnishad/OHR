namespace Booking.API.Models
{
    public partial class BookingsInfo
     {
        public string Id{get;set;}
        public DateTime CheckIn{get;set;}
        public DateTime CheckOut{get;set;}
        public bool Completed{get;set;}
        public string CustomerAddress{get;set;}
        public string CustomerCity{get;set;}
        public string CustomerEmail{get;set;}
        public string CustomerName{get;set;}
        public string CustomerPhone{get;set;}
        public DateTime DateCreated{get;set;}
        public int NoOfGuests{get;set;}
        public string OtherRequests{get;set;}
        public bool Paid{get;set;}
        public decimal TotalFee{get;set;}
        public string HotelName{get;set;}
        public string RoomNo{get;set;}
        public int? CustomerId{get;set;}
    }
}