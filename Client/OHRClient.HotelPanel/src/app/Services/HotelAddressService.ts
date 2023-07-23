import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { HotelAddressViewModel } from "../DomainDTO/HotelAddressViewModel";

@Injectable({
    providedIn: 'root'
  })
export class HotelAddressService
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

    

    GetHotelAddresses():Observable<HotelAddressViewModel[]>
    {
        this.httpOptions = {
            headers:new HttpHeaders({
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem("auth_token")
            })
        };
        return this.http.get<HotelAddressViewModel[]>(this.apiURL+"/HotelLocations",this.httpOptions);
    }

    GetHotelAddress(id:number):Observable<HotelAddressViewModel>
    {
        this.httpOptions = {
            headers:new HttpHeaders({
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem("auth_token")
            })
        };
        return this.http.get<HotelAddressViewModel>(this.apiURL+"/HotelLocations/"+id,this.httpOptions);
    }

    SaveHotelAddress(hotelAddr:HotelAddressViewModel):Observable<any>
    {
        this.httpOptions = {
            headers:new HttpHeaders({
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem("auth_token")
            })
        };
        return this.http.post<HotelAddressViewModel>(this.apiURL+"/HotelLocations",hotelAddr,this.httpOptions);
    }

    EditHotelAddress(hotelAddr:HotelAddressViewModel):Observable<any>
    {
        this.httpOptions = {
            headers:new HttpHeaders({
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem("auth_token")
            })
        };
        return this.http.put<HotelAddressViewModel>(this.apiURL+"/HotelLocations/"+hotelAddr.id,hotelAddr,this.httpOptions);
    }

    RemoveHotelAddress(id:number):Observable<any>
    {
        this.httpOptions = {
            headers:new HttpHeaders({
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem("auth_token")
            })
        };
        return this.http.delete<HotelAddressViewModel>(this.apiURL+"/HotelLocations/"+id,this.httpOptions);
    }
}