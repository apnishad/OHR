using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hotels.API.Models
{
    public partial class RoomTypes
    {
        public string Id{get;set;}
        public decimal BasePrice{get;set;}
        public string Description{get;set;}
        public string Name{get;set;}
        [JsonIgnore()]
        public ICollection<Rooms> Rooms{get;set;}
    }
}