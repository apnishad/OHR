import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { RoomTypesViewModel } from "../DomainDTO/RoomTypesViewModel";
import { HotelInfoViewModel } from "../DomainDTO/HotelInfoViewModel";
import { RoomsViewModel } from "../DomainDTO/RoomsViewModel";

@Injectable({
    providedIn: 'root'
  })
export class RoomsService
{
    apiURL = 'http://localhost:5282/api';
    constructor(private http:HttpClient)
    {
        
    }

    httpOptions = {
        headers:new HttpHeaders({
            'Content-Type':'application/json'
        })
    };

    

    GetRooms():Observable<RoomsViewModel[]>
    {
        return this.http.get<RoomsViewModel[]>(this.apiURL+"/Rooms");
    }

    GetRoom(id:number):Observable<RoomsViewModel>
    {
        return this.http.get<RoomsViewModel>(this.apiURL+"/Rooms/"+id);
    }

    GetRoomByHotel(hotelId:number):Observable<RoomsViewModel>
    {
        return this.http.get<RoomsViewModel>(this.apiURL+"/Rooms/"+hotelId);
    }

    SaveRoom(rooms:RoomsViewModel):Observable<any>
    {   console.log(rooms.price+":"+rooms.id);
        return this.http.post<RoomsViewModel>(this.apiURL+"/Rooms",rooms,this.httpOptions);
    }

    EditRoom(rooms:RoomsViewModel):Observable<any>
    {
        return this.http.put<RoomsViewModel>(this.apiURL+"/Rooms/"+rooms.id,rooms,this.httpOptions);
    }

    RemoveRoom(id:number):Observable<any>
    {
        return this.http.delete<RoomsViewModel>(this.apiURL+"/Rooms/"+id,this.httpOptions);
    }
}