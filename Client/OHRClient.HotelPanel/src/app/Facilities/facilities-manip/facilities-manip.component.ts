import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { DTOStatus } from 'src/app/DomainDTO/DTOStatus';
import { FacilitiesViewModel } from 'src/app/DomainDTO/FacilitiesViewModel';

@Component({
  selector: 'app-facilities-manip',
  templateUrl: './facilities-manip.component.html',
  styleUrls: ['./facilities-manip.component.css']
})
export class FacilitiesManipComponent {
  fctsForm:FormGroup;
  facvm:FacilitiesViewModel;
  status:DTOStatus;
  constructor(private fctType:FormBuilder,public modalRef:MdbModalRef<FacilitiesManipComponent>){
      
  }
  ngOnInit(): void {
    this.fctsForm = this.fctType.group({
      id:[this.facvm.id],
      icon:[this.facvm.iCon,Validators.required],
      name:[this.facvm.name,Validators.required]
    });
    console.log(this.status);
  }

  OnSubmit(frm:FormGroup)
  {
      const facilities:FacilitiesViewModel = {
        id:this.fctsForm.controls['id'].value,
        iCon:this.fctsForm.controls['icon'].value,
        name:this.fctsForm.controls['name'].value
      };
      var response:{sts:string,fcts:FacilitiesViewModel}={sts:'Yes',fcts:facilities};
      this.modalRef.close(response);
  }

  close():void{
    this.modalRef.close({sts:'No'})
  }
}
