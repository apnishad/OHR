import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../Services/LoginService';
import { Router } from '@angular/router';

@Component({
  selector: '[app-side-nav]',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent{
  
  constructor(private logSvc:LoginService,private router:Router)
  {

  }
  
  OnLogOut()
  {
    localStorage.removeItem("auth_token");
    this.logSvc.getSubject().next(false);
    this.router.navigate(["\\"]);
  }
}
