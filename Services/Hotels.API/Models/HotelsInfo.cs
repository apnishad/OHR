using System;
using System.Collections.Generic;

namespace Hotels.API.Models
{
    public partial class HotelsInfo
    {

        public HotelsInfo(){
            HotelAddress = new HashSet<HotelAddress>();
            Rooms = new HashSet<Rooms>();
        }
        public string HotelId{get;set;}
        public string HotelName{get;set;}
        public string Description{get;set;}
        public virtual ICollection<HotelAddress> HotelAddress {get;set;}
        public ICollection<Rooms> Rooms{get;set;}
    }
}  