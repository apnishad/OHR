using System;
using System.Collections.Generic;

namespace OnlineHotel.Infra.Domain.Models
{
    public partial class HotelBookings
    {
        public int BookingId{get;set;}
        public int? HotelId{get;set;}
        public DateTime? CheckInDate{get;set;}
        public DateTime? CheckOutDate{get;set;}
        public int? UserId{get;set;}
        public string PaymentMode{get;set;}
        public string InvoiceNumber{get;set;}
        public DateTime? BookingDate{get;set;}
        public decimal? Amount{get;set;}
        public Hotels Hotel{get;set;}
    }
}