import { HotelAddressViewModel } from "./HotelAddressViewModel";
import { ImageViewModel } from "./ImageViewModel";
import { RoomTypesViewModel } from "./RoomTypesViewModel";

export class RoomsViewModel
{
    id:string;
    number:number;
    available:boolean;
    maximumGuests:number;
    price:number;
    description:string;
    roomTypeId:string;
    roomLocId:string;
    roomType:RoomTypesViewModel;
    roomLoc:HotelAddressViewModel;
    images:ImageViewModel[];
}