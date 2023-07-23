import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { RoomsViewModel } from "../DomainDTO/RoomsViewModel";
import { ImageViewModel } from "../DomainDTO/ImageViewModel";

@Injectable({
    providedIn: 'root'
  })
export class ImageService
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

    

    GetImages():Observable<ImageViewModel[]>
    {
        return this.http.get<ImageViewModel[]>(this.apiURL+"/Images");
    }

    GetImage(id:string):Observable<ImageViewModel>
    {
        return this.http.get<ImageViewModel>(this.apiURL+"/Images/"+id);
    }

    GetImagesByRoomId(id:string):Observable<ImageViewModel[]>
    {
        return this.http.get<ImageViewModel[]>(this.apiURL+"/Images/GetImagesByRoomId/"+id);
    }

    SaveImage(images:ImageViewModel):Observable<any>
    {
        this.httpOptions = {
            headers:new HttpHeaders({
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem("auth_token")
            })
        };
        return this.http.post<ImageViewModel>(this.apiURL+"/Images",images,this.httpOptions);
    }

    EditRoom(images:ImageViewModel):Observable<any>
    {
        this.httpOptions = {
            headers:new HttpHeaders({
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem("auth_token")
            })
        };
        return this.http.put<ImageViewModel>(this.apiURL+"/Rooms/"+images.id,images,this.httpOptions);
    }

    RemoveRoom(id:string):Observable<any>
    {
        this.httpOptions = {
            headers:new HttpHeaders({
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem("auth_token")
            })
        };
        return this.http.delete<ImageViewModel>(this.apiURL+"/Images/"+id,this.httpOptions);
    }
}