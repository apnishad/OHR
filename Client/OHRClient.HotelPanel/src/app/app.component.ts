import { Component, OnInit } from '@angular/core';
import { LoginService } from './Services/LoginService';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'OHRClient.Admin';
  isLoggedIn:boolean = false;
  isRegister:boolean = true;
  private authListenerSub: Subscription;

  constructor(private logSvc:LoginService){

  }

  ngOnInit(): void {
    var token = localStorage.getItem("auth_token");
    if(token!== null)
    {
      this.isLoggedIn = true;
      this.isRegister = false;
    }
    this.authListenerSub =  this.logSvc.getAuthStatusListener().subscribe((IsAuth)=>{
      this.isLoggedIn = IsAuth;
      this.isRegister = !IsAuth;
    });
  }
}
