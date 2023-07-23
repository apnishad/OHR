import { ImplicitReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { RoomTypesViewModel } from 'src/app/DomainDTO/RoomTypesViewModel';
import {DTOStatus} from 'src/app/DomainDTO/DTOStatus';

@Component({
  selector: 'app-room-types-manip',
  templateUrl: './room-types-manip.component.html',
  styleUrls: ['./room-types-manip.component.css']
})
export class RoomTypesManipComponent implements OnInit {
  roomTypeForm:FormGroup;
  roomTypevm:RoomTypesViewModel;
  status:DTOStatus;
  constructor(private rmType:FormBuilder,public modalRef:MdbModalRef<RoomTypesManipComponent>){}
  ngOnInit(): void {
    this.roomTypeForm = this.rmType.group({
      id:[this.roomTypevm.id],
      name:[this.roomTypevm.name,Validators.required],
      basePrice:[this.roomTypevm.basePrice,Validators.required],
      description:[this.roomTypevm.description]
    });
    console.log(this.status);
  }

  OnSubmit(frm:FormGroup)
  {
      const rmTypes:RoomTypesViewModel = {
        id:this.roomTypeForm.controls['id'].value,
        name:this.roomTypeForm.controls['name'].value,
        basePrice:this.roomTypeForm.controls['basePrice'].value,
        description:this.roomTypeForm.controls['description'].value,
      };
      var response:{sts:string,rmType:RoomTypesViewModel}={sts:'Yes',rmType:rmTypes};
      this.modalRef.close(response);
  }

  close():void{
    this.modalRef.close({sts:'No'})
  }
}
