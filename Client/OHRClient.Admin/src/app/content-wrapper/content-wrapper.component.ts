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
    /*if(this.IsReload)
    {
      const currentRoute = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([currentRoute]); // navigate to same route
          }); 
          this.IsReload=false;
    }*/
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
}

