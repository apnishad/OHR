import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { RoomTypesViewModel } from "../DomainDTO/RoomTypesViewModel";
import { HotelInfoViewModel } from "../DomainDTO/HotelInfoViewModel";

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

    

    GetHotelsInfo():Observable<HotelInfoViewModel[]>
    {
        return this.http.get<HotelInfoViewModel[]>(this.apiURL+"/HotelsInfo/HotelsList");
    }

    GetHotelInfo(id:number):Observable<HotelInfoViewModel>
    {
        return this.http.get<HotelInfoViewModel>(this.apiURL+"/HotelsInfo/"+id);
    }

    SaveHotelInfo(hotelInfo:HotelInfoViewModel):Observable<any>
    {
        console.log("Services -- "+hotelInfo.hotelName);
        return this.http.post<HotelInfoViewModel>(this.apiURL+"/HotelsInfo",hotelInfo,this.httpOptions);
    }

    EditHotelInfo(hotelInfo:HotelInfoViewModel):Observable<any>
    {
        return this.http.put<HotelInfoViewModel>(this.apiURL+"/HotelsInfo/"+hotelInfo.hotelId,hotelInfo,this.httpOptions);
    }

    RemoveHotelInfo(id:number):Observable<any>
    {
        return this.http.delete<HotelInfoViewModel>(this.apiURL+"/HotelsInfo/"+id,this.httpOptions);
    }
}