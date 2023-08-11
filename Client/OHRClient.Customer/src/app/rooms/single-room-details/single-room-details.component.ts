import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JsLoader } from 'src/app/Common/Common';
import { RoomsViewModel } from 'src/app/DomainDto/RoomsViewModel';
import { RoomsService } from 'src/app/Services/RoomService';

@Component({
  selector: 'app-single-room-details',
  templateUrl: './single-room-details.component.html',
  styleUrls: ['./single-room-details.component.css']
})
export class SingleRoomDetailsComponent implements OnInit,AfterViewInit{
  rmvm:RoomsViewModel;
  constructor(private jsLd:JsLoader,private route:ActivatedRoute,private rmServe:RoomsService)
  {
    
  }
  ngAfterViewInit(): void {
    
  }
  
  
  ngOnInit(): void {
    
    let rmid = this.route.snapshot.paramMap.get('rid');
    console.log(rmid);
    this.rmServe.GetRoom(rmid).subscribe((data)=>{
      console.log(data);
      this.rmvm = data;
      this.jsLd.loadExternalScript("./../../../assets/js/aos.js");
    this.jsLd.loadExternalScript("./../../../assets/js/main1.js");
      this.jsLd.loadExternalScript("./../../../assets/js/owl.carousel.min.js");
    });
    
    

    
  }

}
