import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotelViewModel } from 'src/app/DomainDTO/HotelViewModel';
import { HotelInfoService } from 'src/app/Services/HotelInfoService';

@Component({
  selector: 'app-view-hotel-info',
  templateUrl: './view-hotel-info.component.html',
  styleUrls: ['./view-hotel-info.component.css']
})
export class ViewHotelInfoComponent {
  hotelvm:HotelViewModel;
  constructor(private hotelServ:HotelInfoService,private router:Router){
    this.hotelServ.GetLoggedHotelInfo().subscribe((data)=>{
      console.log(data);
      this.hotelvm =data;
    });
  }
  ngOnInit(): void {
    
  }

  Edit()
  {
    this.router.navigate(["editHotel"]);
  }
}
