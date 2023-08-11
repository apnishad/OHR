import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../Services/RegistrationService';
import { RegistrationViewModel } from '../DomainDto/RegistrationViewModel';

@Component({
  selector: '[app-register]',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerform:FormGroup;
  submitted=false;
  lblstatus:string="";

  constructor(private reg:FormBuilder,private regSvc:RegistrationService){
    
  }

  get regF(){
    return this.registerform.controls;
  }

  mustMatch(controlName:string, matchingControlName:string)
  {
    return (formGroup:FormGroup)=>{
      const control = formGroup.controls[controlName];
      const matchControl = formGroup.controls[matchingControlName];
      if(matchControl.errors && !matchControl.errors['mustMatch'])
      {
          return;
      }
      if(control.value !== matchControl.value)
      {
        matchControl.setErrors({mustMatch:true});
      }
      else
      {
        matchControl.setErrors(null);
      }
    }
  }

  ngOnInit(): void {
    this.registerform = this.reg.group({
      emailaddr:['',[Validators.required,Validators.email]],
      pwd:['',[Validators.required, Validators.minLength(6)]],
      cpwd:['',Validators.required],
      fname:['',Validators.required],
      lname:['',Validators.required],
      loc:['',Validators.required],
      gender:['',Validators.required],
      acceptTerms:[false,Validators.requiredTrue]
    },
    {
      validators:this.mustMatch('pwd' , 'cpwd')
    });
  }

  OnSubmit(frm:FormGroup)
  {
    this.submitted = true;
    
    if(this.registerform.invalid)
    {
      return;
    }
    
    var regvm:RegistrationViewModel = {
      eMail:this.registerform.controls['emailaddr'].value,
      password:this.registerform.controls['pwd'].value,
      firstName:this.registerform.controls['fname'].value,
      lastName:this.registerform.controls['lname'].value,
      location:this.registerform.controls['loc'].value,
      gender:this.registerform.controls['gender'].value,
      userType:"CustomerUser"
    }
    console.log(regvm.gender);
    this.regSvc.Register(regvm).subscribe((data:any)=>{
      this.lblstatus = data.message;
    })
  }
}
