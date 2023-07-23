import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { RegistrationViewModel } from "../DomainDTO/RegistrationViewModel";
import { Injectable } from "@angular/core";
import { CredentialsViewModel } from "../DomainDTO/CredentialsViewModel";

@Injectable({
    providedIn: 'root'
  })
export class LoginService
{

    private authListener  = new Subject<boolean>();
    apiURL = 'http://localhost:5147/api';
    constructor(private http:HttpClient)
    {
        
    }

    httpOptions = {
        headers:new HttpHeaders({
            'Content-Type':'application/json'
        })
    };

    getSubject():Subject<boolean>
    {
        return this.authListener;
    }

    getAuthStatusListener()
    {
        return this.authListener.asObservable();
    }

    Login(logsvc:CredentialsViewModel):Observable<CredentialsViewModel>
    {
        return this.http.post<CredentialsViewModel>(this.apiURL+"/Auth",logsvc,this.httpOptions);
    }
}