using System;
using System.Collections.Generic;

namespace OnlineHotel.Infra.Domain.Models
{
    public partial class HotelFacilities
    {
        public int FacilitiesId{get;set;}
        public string FacilityName{get;set;}
        public string IconUrl{get;set;}
        public int? HotelId{get;set;}
        public Hotels Hotel{get;set;}
    }
}