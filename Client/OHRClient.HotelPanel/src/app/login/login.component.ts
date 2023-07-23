import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../Services/LoginService';
import { CredentialsViewModel } from '../DomainDTO/CredentialsViewModel';
import { Route, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HotelInfoService } from '../Services/HotelInfoService';

@Component({
  selector: '[app-login]',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform:FormGroup;
  submitted=false;
  errors=[];
  

  constructor(private lgn:FormBuilder,private logSvc:LoginService,private hotelServ:HotelInfoService, private router:Router)
  {

  }
  ngOnInit(): void {
    this.loginform = this.lgn.group({
        emailaddr:['',[Validators.required,Validators.email]],
        pwd:['',Validators.required]
      }
    );
    this.logSvc.getAuthStatusListener();
  }

  OnSubmit(frm:FormGroup)
  {
    this.submitted = true;
    
    if(this.loginform.invalid)
    {
      return;
    }
    var logDto:CredentialsViewModel = { userName:this.loginform.controls['emailaddr'].value,password:this.loginform.controls['pwd'].value};
    this.logSvc.Login(logDto).subscribe((data)=>{
      localStorage.setItem("auth_token",data["auth_token"]);
      console.log(data);
      this.hotelServ.GetHotelInfo(data["id"]).subscribe((hdata)=>{
        console.log("Success : "+hdata);
        this.router.navigate(["dashboard"]);
      },
      (error)=>{
        console.log("Error --");
        console.log(error);
        this.router.navigate(["newHotel"])
      });
      this.logSvc.getSubject().next(true);
            
    },
    (err)=>{
      this.errors = err.error["login failure"];
    });
  }


  get lgnF(){
    return this.loginform.controls;
  }
}
