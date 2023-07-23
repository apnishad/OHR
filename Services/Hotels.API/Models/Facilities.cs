using System.Collections.Generic;

namespace Hotels.API.Models
{
    public partial class Facilities
    {
        public Facilities()
        {
            RoomFacilitiesRelationships = new HashSet<RoomFacilitiesRelationships>();
        }
        public string Id{get;set;}
        public string ICon{get;set;}
        public string Name{get;set;}

        public ICollection<RoomFacilitiesRelationships> RoomFacilitiesRelationships{get;set;}
    }
}