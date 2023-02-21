using System;
using System.Collections.Generic;

namespace OnlineHotel.Infra.Domain.Models
{
    public partial class HotelCategories
    {
        public HotelCategories()
        {
            Hotels = new HashSet<Hotels>();
        }

        public int CategoryId{get;set;}
        public string Name{get;set;}
        public string Description{get;set;}
        public ICollection<Hotels> Hotels{get;set;}
    }
}