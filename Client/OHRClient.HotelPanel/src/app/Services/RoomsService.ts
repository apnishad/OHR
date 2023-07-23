import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
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

    GetRoom(id:string):Observable<RoomsViewModel>
    {
        return this.http.get<RoomsViewModel>(this.apiURL+"/Rooms/"+id);
    }

    GetRoomByHotel(hotelId:string):Observable<RoomsViewModel>
    {
        return this.http.get<RoomsViewModel>(this.apiURL+"/Rooms/"+hotelId);
    }

    SaveRoom(rooms:RoomsViewModel):Observable<any>
    {
        this.httpOptions = {
            headers:new HttpHeaders({
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem("auth_token")
            })
        };
        return this.http.post<RoomsViewModel>(this.apiURL+"/Rooms",rooms,this.httpOptions);
    }

    EditRoom(rooms:RoomsViewModel):Observable<any>
    {
        this.httpOptions = {
            headers:new HttpHeaders({
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem("auth_token")
            })
        };
        console.log(rooms)
        return this.http.put<RoomsViewModel>(this.apiURL+"/Rooms/"+rooms.id,rooms,this.httpOptions);
    }

    RemoveRoom(id:string):Observable<any>
    {
        this.httpOptions = {
            headers:new HttpHeaders({
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem("auth_token")
            })
        };
        return this.http.delete<RoomsViewModel>(this.apiURL+"/Rooms/"+id,this.httpOptions);
    }
}