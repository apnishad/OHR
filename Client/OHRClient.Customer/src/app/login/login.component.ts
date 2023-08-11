import { Component, ViewChild } from '@angular/core';
import { CredentialsViewModel } from '../DomainDto/CredentialsViewModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../Services/LoginService';

@Component({
  selector: '[app-login]',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginform:FormGroup;
  submitted=false;
  errors=[];
  @ViewChild('closebutton') closeButton;
  

  constructor(private lgn:FormBuilder,private logSvc:LoginService, private router:Router)
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
      this.logSvc.getSubject().next(true);
      this.closeButton.nativeElement.click();
      this.router.navigate(['dashboard']);
    },
    (err)=>{
      this.errors = err.error["login failure"];
    });
  }


  get lgnF(){
    return this.loginform.controls;
  }
}
