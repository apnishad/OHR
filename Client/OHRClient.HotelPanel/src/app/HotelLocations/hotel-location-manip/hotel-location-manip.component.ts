import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { DTOStatus } from 'src/app/DomainDTO/DTOStatus';
import { HotelAddressViewModel } from 'src/app/DomainDTO/HotelAddressViewModel';

@Component({
  selector: 'app-hotel-location-manip',
  templateUrl: './hotel-location-manip.component.html',
  styleUrls: ['./hotel-location-manip.component.css']
})
export class HotelLocationManipComponent implements OnInit {
  hLocForm:FormGroup;
  hotelAddrvm:HotelAddressViewModel;
  status:DTOStatus;
  constructor(private rmType:FormBuilder,public modalRef:MdbModalRef<HotelLocationManipComponent>){
      
  }
  ngOnInit(): void {
    this.hLocForm = this.rmType.group({
      id:[this.hotelAddrvm.id],
      address:[this.hotelAddrvm.address,Validators.required],
      location:[this.hotelAddrvm.location,Validators.required],
      city:[this.hotelAddrvm.city,Validators.required]
    });
    console.log(this.status);
  }

  OnSubmit(frm:FormGroup)
  {
      const hAddr:HotelAddressViewModel = {
        id:this.hLocForm.controls['id'].value,
        address:this.hLocForm.controls['address'].value,
        location:this.hLocForm.controls['location'].value,
        city:this.hLocForm.controls['city'].value,
        hotelId:""
      };
      var response:{sts:string,hotelAddr:HotelAddressViewModel}={sts:'Yes',hotelAddr:hAddr};
      this.modalRef.close(response);
  }

  close():void{
    this.modalRef.close({sts:'No'})
  }
}
