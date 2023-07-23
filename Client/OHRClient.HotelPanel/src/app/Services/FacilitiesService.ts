import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { RoomTypesViewModel } from "../DomainDTO/RoomTypesViewModel";
import { FacilitiesViewModel } from "../DomainDTO/FacilitiesViewModel";

@Injectable({
    providedIn: 'root'
  })
export class FacilitiesService
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

    GetFacilities():Observable<FacilitiesViewModel[]>
    {
        return this.http.get<FacilitiesViewModel[]>(this.apiURL+"/Facilities");
    }

    GetFacility(id:string):Observable<FacilitiesViewModel>
    {
        return this.http.get<FacilitiesViewModel>(this.apiURL+"/Facilities/"+id);
    }

    SaveFacilities(fctvm:FacilitiesViewModel):Observable<any>
    {
        return this.http.post<FacilitiesViewModel>(this.apiURL+"/Facilities",fctvm,this.httpOptions);
    }

    EditFacilities(fctvm:FacilitiesViewModel):Observable<any>
    {
        return this.http.put<FacilitiesViewModel>(this.apiURL+"/Facilities/"+fctvm.id,fctvm,this.httpOptions);
    }

    RemoveFacilities(id:string):Observable<any>
    {
        return this.http.delete<FacilitiesViewModel>(this.apiURL+"/Facilities/"+id,this.httpOptions);
    }
}