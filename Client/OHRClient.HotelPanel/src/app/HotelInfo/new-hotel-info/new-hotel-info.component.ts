import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotelViewModel } from 'src/app/DomainDTO/HotelViewModel';
import { HotelInfoService } from 'src/app/Services/HotelInfoService';

@Component({
  selector: 'app-new-hotel-info',
  templateUrl: './new-hotel-info.component.html',
  styleUrls: ['./new-hotel-info.component.css']
})
export class NewHotelInfoComponent {
  hotelForm:FormGroup;
  hotelvm:HotelViewModel;
  constructor(private hotel:FormBuilder,private hotelServ:HotelInfoService,private router:Router){}
  ngOnInit(): void {
    this.hotelForm = this.hotel.group({
      id:[""],
      hotelName:["",Validators.required],
      hotelAddress:["",Validators.required],
      location:["",Validators.required],
      city:["",Validators.required],
      description:[""]
    });
  }

  OnSubmit(frm:FormGroup)
  {
      const ht:HotelViewModel = {
        hotelId:this.hotelForm.controls['id'].value,
        hotelName:this.hotelForm.controls['hotelName'].value,
        hotelAddress:[
          {
            id:0,
            address:this.hotelForm.controls['hotelAddress'].value,
            location:this.hotelForm.controls['location'].value,
            city:this.hotelForm.controls['city'].value,
            hotelId:this.hotelForm.controls['id'].value
          }
        ],
        description:this.hotelForm.controls['description'].value,
      };
      this.hotelServ.SaveHotelInfo(ht).subscribe((data)=>{
        this.router.navigate(["dashboard"]);
      });
  }
}
