import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { RoomTypesViewModel } from "../DomainDTO/RoomTypesViewModel";

@Injectable({
    providedIn: 'root'
  })
export class RoomTypesService
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

    

    GetRoomTypes():Observable<RoomTypesViewModel[]>
    {
        return this.http.get<RoomTypesViewModel[]>(this.apiURL+"/RoomTypes");
    }

    GetRoomType(id:string):Observable<RoomTypesViewModel>
    {
        return this.http.get<RoomTypesViewModel>(this.apiURL+"/RoomTypes/"+id);
    }

    SaveRoomTypes(rmTypes:RoomTypesViewModel):Observable<any>
    {
        return this.http.post<RoomTypesViewModel>(this.apiURL+"/RoomTypes",rmTypes,this.httpOptions);
    }

    EditRoomTypes(rmTypes:RoomTypesViewModel):Observable<any>
    {
        return this.http.put<RoomTypesViewModel>(this.apiURL+"/RoomTypes/"+rmTypes.id,rmTypes,this.httpOptions);
    }

    RemoveRoomTypes(id:string):Observable<any>
    {
        return this.http.delete<RoomTypesViewModel>(this.apiURL+"/RoomTypes/"+id,this.httpOptions);
    }
}