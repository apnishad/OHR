import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { DTOStatus } from 'src/app/DomainDTO/DTOStatus';
import { HotelInfoViewModel } from 'src/app/DomainDTO/HotelInfoViewModel';

@Component({
  selector: 'app-hotel-info-manip',
  templateUrl: './hotel-info-manip.component.html',
  styleUrls: ['./hotel-info-manip.component.css']
})
export class HotelInfoManipComponent {
  hotelInfoForm:FormGroup;
  hotelInfovm:HotelInfoViewModel;
  status:DTOStatus;
  constructor(private hfType:FormBuilder,public modalRef:MdbModalRef<HotelInfoManipComponent>){}
  ngOnInit(): void {
    this.hotelInfoForm = this.hfType.group({
      id:[this.hotelInfovm.hotelId],
      name:[this.hotelInfovm.hotelName,Validators.required],
      description:[this.hotelInfovm.description]
    });
  }

  OnSubmit(frm:FormGroup)
  {
      const hfTypes:HotelInfoViewModel = {
        hotelId:this.hotelInfoForm.controls['id'].value,
        hotelName:this.hotelInfoForm.controls['name'].value,
        description:this.hotelInfoForm.controls['description'].value,
      };
      var response:{sts:string,hinfo:HotelInfoViewModel}={sts:'Yes',hinfo:hfTypes};
      this.modalRef.close(response);
  }

  close():void
  {
    this.modalRef.close({sts:'No'});
  }
}
