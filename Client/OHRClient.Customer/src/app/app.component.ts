import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoginService } from './Services/LoginService';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  host: { ngNoHost: '' },
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'OHRClient.Customer';
  loggedIn:boolean=false;
  notLoggedIn:boolean=true;
  private authListenerSub: Subscription;

  constructor(private logSvc:LoginService, private router:Router){

  }

  ngOnInit(): void {
    console.log("Init");
    var token = localStorage.getItem("auth_token");
    console.log("token -- "+token);
    if(token!== null)
    {
      this.loggedIn = true;
      this.notLoggedIn = false;
    }
    this.authListenerSub =  this.logSvc.getAuthStatusListener().subscribe((IsAuth)=>{
      this.loggedIn = IsAuth;
      this.notLoggedIn = !IsAuth;
    });
  }

  OnLogOut(){
    localStorage.removeItem("auth_token");
    this.logSvc.getSubject().next(false);
    this.router.navigate(["/"]);
  }
}