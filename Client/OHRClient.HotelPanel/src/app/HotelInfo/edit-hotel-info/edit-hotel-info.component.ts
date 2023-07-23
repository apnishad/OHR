import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotelViewModel } from 'src/app/DomainDTO/HotelViewModel';
import { HotelInfoService } from 'src/app/Services/HotelInfoService';

@Component({
  selector: 'app-edit-hotel-info',
  templateUrl: './edit-hotel-info.component.html',
  styleUrls: ['./edit-hotel-info.component.css']
})
export class EditHotelInfoComponent implements OnInit {
  hotelForm:FormGroup;
  hotelvm:HotelViewModel;
  constructor(private hotel:FormBuilder,private hotelServ:HotelInfoService,private router:Router){   
    this.hotelForm = this.hotel.group({
      id:new FormControl(''),
      aid:new FormControl(''),
      hotelName:new FormControl('',[Validators.required]),
      hotelAddress:new FormControl('',[Validators.required]),
      location:new FormControl('',[Validators.required]),
      city:new FormControl('',[Validators.required]),
      description:new FormControl('')
    });
  }

  ngOnInit(): void {
    this.hotelServ.GetLoggedHotelInfo().subscribe((data)=>{
      this.hotelvm =data;
      this.hotelForm = this.hotel.group({
        id:new FormControl(this.hotelvm.hotelId),
        aid:new FormControl(this.hotelvm.hotelAddress[0].id),
        hotelName:new FormControl(this.hotelvm.hotelName,[Validators.required]),
        hotelAddress:new FormControl(this.hotelvm.hotelAddress[0].address,[Validators.required]),
        location:new FormControl(this.hotelvm.hotelAddress[0].location,[Validators.required]),
        city:new FormControl(this.hotelvm.hotelAddress[0].city,[Validators.required]),
        description:new FormControl(this.hotelvm.description)
      });
    });
  }

  OnSubmit(frm:FormGroup)
  {
      const ht:HotelViewModel = {
        hotelId:this.hotelForm.controls['id'].value,
        hotelName:this.hotelForm.controls['hotelName'].value,
        hotelAddress:[
          {
            id:this.hotelForm.controls["aid"].value,
            address:this.hotelForm.controls['hotelAddress'].value,
            location:this.hotelForm.controls['location'].value,
            city:this.hotelForm.controls['city'].value,
            hotelId:this.hotelForm.controls['id'].value
          }
        ],
        description:this.hotelForm.controls['description'].value,
      };
      this.hotelServ.EditHotelInfo(ht).subscribe((data)=>{
        this.router.navigate(["dashboard"]);
      });
  }
}
