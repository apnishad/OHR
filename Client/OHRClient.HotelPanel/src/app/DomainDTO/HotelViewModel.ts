export class HotelViewModel
{
    hotelId:string;
    hotelName:string;
    description:string;
    hotelAddress:[
        {
            id:number,
            address:string,
            location:string,
            city:string,
            hotelId:string
        }
    ]
}