import { Component, OnInit } from '@angular/core';
import { JsLoader } from '../Common/Common';
import { RoomsService } from '../Services/RoomService';
import { RoomsViewModel } from '../DomainDto/RoomsViewModel';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit 
{

  rms:RoomsViewModel[]=[];
  constructor(private jsLd:JsLoader,private rmServ:RoomsService){
   
  }
  
  ngOnInit(): void {
    
    this.jsLd.loadExternalScript("./../assets/js/aos.js");
    this.jsLd.loadExternalScript("./../assets/js/main1.js");

    this.rmServ.GetRooms().subscribe((data)=>{
      console.log(data);
      this.rms = data;
    },
    (err)=>{
      console.log(err);
    });
  }
}
