using System;
using System.Collections.Generic;

namespace OnlineHotel.Infra.Domain.Models
{
    public partial class HotelRoom
    {
        public int RoomId{get;set;}
        public string Name{get;set;}
        public string Description{get;set;}
        public bool? BreakfastIncluded{get;set;}
        public int? HotelId{get;set;}
        public Hotels Hotel{get;set;}
    }
}