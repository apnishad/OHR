namespace Hotels.API.Models
{
    public partial class RoomFacilitiesRelationships
    {
        public string RoomId{get;set;}
        public string FeatureId{get;set;}

        public Facilities Feature{get;set;}
        public Rooms Room{get;set;}
    }
}