import { Component, OnInit } from '@angular/core';
import { JsLoader } from '../Common/Common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  constructor(private jsLd:JsLoader){}
  
  ngOnInit(): void {
    this.jsLd.loadExternalScript("./../assets/js/aos.js");
    this.jsLd.loadExternalScript("./../assets/js/main1.js");
  }
}
