import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { DTOStatus } from 'src/app/DomainDTO/DTOStatus';
import { RoomsViewModel } from 'src/app/DomainDTO/RoomsViewModel';

@Component({
  selector: 'app-rooms-manip',
  templateUrl: './rooms-manip.component.html',
  styleUrls: ['./rooms-manip.component.css']
})
export class RoomsManipComponent {
  roomForm:FormGroup;
  roomvm:RoomsViewModel;
  status:DTOStatus;
  constructor(private rm:FormBuilder,public modalRef:MdbModalRef<RoomsManipComponent>){}
  ngOnInit(): void {
    this.roomForm = this.rm.group({
      id:[this.roomvm.id],
      number:[this.roomvm.number,Validators.required],
      available:[this.roomvm.available],
      maximumGuests:[this.roomvm.maximumGuests,Validators.required],
      price:[this.roomvm.price,Validators.required],
      roomTypeId:[this.roomvm.roomTypeId,Validators.required],
      description:[this.roomvm.description]
    });
  }

  OnSubmit(frm:FormGroup)
  {
      var rm:RoomsViewModel = {
        id:this.roomForm.controls['id'].value,
        number:this.roomForm.controls['number'].value,
        maximumGuests:this.roomForm.controls['maximumGuests'].value,
        price:this.roomForm.controls['price'].value,
        available : true,
        description:this.roomForm.controls['description'].value,
        roomTypeId:this.roomForm.controls['roomTypeId'].value,
      };
      var response:{sts:string,rms:RoomsViewModel}={sts:'Yes',rms:rm};
      this.modalRef.close(response);
  }

  close():void{
    this.modalRef.close({sts:'No'})
  }
}
