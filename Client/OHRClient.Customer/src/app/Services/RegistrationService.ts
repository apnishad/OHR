import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { RegistrationViewModel } from "../DomainDto/RegistrationViewModel";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class RegistrationService
{
    apiURL = 'http://localhost:5147/api';
    constructor(private http:HttpClient)
    {
        
    }

    httpOptions = {
        headers:new HttpHeaders({
            'Content-Type':'application/json'
        })
    };

    Register(regsvc:RegistrationViewModel):Observable<RegistrationViewModel>
    {
        console.log(regsvc.gender);
        return this.http.post<RegistrationViewModel>(this.apiURL+"/Accounts",regsvc,this.httpOptions);
    }
}