import { Component, Input, OnInit } from '@angular/core';
import { JsLoader } from 'src/app/Common/Common';
import { RoomsViewModel } from 'src/app/DomainDto/RoomsViewModel';

@Component({
  selector: 'app-rooms-item',
  templateUrl: './rooms-item.component.html',
  styleUrls: ['./rooms-item.component.css']
})
export class RoomsItemComponent implements OnInit {

  @Input() rmObj : RoomsViewModel;
  constructor(private jsLd:JsLoader){
    
  }

  ngOnInit(): void {
    this.jsLd.loadExternalScript("./../../assets/js/aos.js");
    this.jsLd.loadExternalScript("./../../assets/js/main1.js");
  }
}
