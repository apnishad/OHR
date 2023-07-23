import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: '[app-content-wrapper]',
  templateUrl: './content-wrapper.component.html',
  styleUrls: ['./content-wrapper.component.css']
})
export class ContentWrapperComponent implements OnInit{
  private IsReload = true;
  constructor(private router:Router){
    
  }
  ngOnInit(): void {
    
  }

  GetHotels()
  {
    this.router.navigate(["hotelInfo"])
  }

  GetRooms()
  {
    this.router.navigate(["rooms"])
  }

  GetRoomTypes()
  {
    this.router.navigate(["roomtypes"])
  }

  GetHotelLocations()
  {
    this.router.navigate(["hotelLocations"])
  }

  GetFacilities()
  {
    this.router.navigate(["facilities"])
  }

  GetBookings()
  {
    this.router.navigate(["bookings"])
  }
}

