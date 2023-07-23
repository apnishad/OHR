import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { RoomTypesViewModel } from "../DomainDTO/RoomTypesViewModel";
import { HotelViewModel } from "../DomainDTO/HotelViewModel";

@Injectable({
    providedIn: 'root'
  })
export class HotelInfoService
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

    

    GetHotelsInfo():Observable<HotelViewModel[]>
    {
        return this.http.get<HotelViewModel[]>(this.apiURL+"/HotelsInfo/HotelsList");
    }

    GetLoggedHotelInfo():Observable<HotelViewModel>
    {
        this.httpOptions = {
            headers:new HttpHeaders({
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem("auth_token")
            })
        };
        
        console.log(this.httpOptions);
        return this.http.get<HotelViewModel>(this.apiURL+"/HotelsInfo/GetLoggedHotelsInfo",this.httpOptions);
    }

    GetHotelInfo(id:string):Observable<HotelViewModel>
    {
        this.httpOptions = {
            headers:new HttpHeaders({
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem("auth_token")
            })
        };
        
        console.log(this.httpOptions);
        return this.http.get<HotelViewModel>(this.apiURL+"/HotelsInfo/"+id,this.httpOptions);
    }

    SaveHotelInfo(hotelInfo:HotelViewModel):Observable<any>
    {
        this.httpOptions = {
            headers:new HttpHeaders({
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem("auth_token")
            })
        };
        return this.http.post<HotelViewModel>(this.apiURL+"/HotelsInfo",hotelInfo,this.httpOptions);
    }

    EditHotelInfo(hotelInfo:HotelViewModel):Observable<any>
    {
        console.log(hotelInfo);
        return this.http.put<HotelViewModel>(this.apiURL+"/HotelsInfo/"+hotelInfo.hotelId,hotelInfo,this.httpOptions);
    }

    RemoveHotelInfo(id:string):Observable<any>
    {
        return this.http.delete<HotelViewModel>(this.apiURL+"/HotelsInfo/"+id,this.httpOptions);
    }
}