import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { RoomTypesViewModel } from "../DomainDTO/RoomTypesViewModel";
import { FacilitiesViewModel } from "../DomainDTO/FacilitiesViewModel";
import { BookingViewModel } from "../DomainDTO/BookingViewModel";

@Injectable({
    providedIn: 'root'
  })
export class BookingService
{
    apiURL = 'http://localhost:5252/api';
    constructor(private http:HttpClient)
    {
        
    }

    httpOptions = {
        headers:new HttpHeaders({
            'Content-Type':'application/json'
        })
    };

    GetBookings():Observable<BookingViewModel[]>
    {
        return this.http.get<BookingViewModel[]>(this.apiURL+"/Bookings");
    }

    GetBooking(id:string):Observable<BookingViewModel>
    {
        return this.http.get<BookingViewModel>(this.apiURL+"/Bookings/"+id);
    }

    SaveBooking(bkgvm:BookingViewModel):Observable<any>
    {
        return this.http.post<BookingViewModel>(this.apiURL+"/Bookings",bkgvm,this.httpOptions);
    }

    EditBooking(bkgvm:BookingViewModel):Observable<any>
    {
        return this.http.put<FacilitiesViewModel>(this.apiURL+"/Bookings/"+bkgvm.id,bkgvm,this.httpOptions);
    }

    RemoveBooking(id:string):Observable<any>
    {
        return this.http.delete<BookingViewModel>(this.apiURL+"/Bookings/"+id,this.httpOptions);
    }
}