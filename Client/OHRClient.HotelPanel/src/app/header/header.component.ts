import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../Services/LoginService';
import { Route, Router } from '@angular/router';

@Component({
  selector: '[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  IsLoggedIn:boolean=false;
  private authListenerSub: Subscription;

  constructor(private logSvc:LoginService, private router:Router){

  }

  ngOnInit(): void {
    var token = localStorage.getItem("auth_token");
    if(token!== null)
    {
      this.IsLoggedIn = true;
    }
    this.authListenerSub =  this.logSvc.getAuthStatusListener().subscribe((IsAuth)=>{
      this.IsLoggedIn = IsAuth;
    });
  }

  OnLogOut()
  {
    localStorage.removeItem("auth_token");
    this.logSvc.getSubject().next(false);
    this.router.navigate(["/"]);
  }

}
