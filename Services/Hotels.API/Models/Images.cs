using System.Collections.Generic;

namespace Hotels.API.Models
{
    public partial class Images
    {
        public Images()
        {
            ItemImageRelationships = new HashSet<ItemImageRelationships>();
        }

        public string Id{get;set;}
        public string RoomId{get;set;}
        public byte[] ImgData{get;set;}
        public Rooms Room{get;set;}
        public ICollection<ItemImageRelationships> ItemImageRelationships{get;set;}
    }
}