namespace Hotels.API.Models
{
    public partial class ItemImageRelationships
    {
        public string ItemId{get;set;}
        public string ImageId{get;set;}

        public Images Image{get;set;}
    }
}