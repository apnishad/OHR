import { Component } from '@angular/core';
import { JsLoader } from '../Common/Common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  constructor(private jsLd:JsLoader){}
  
  ngOnInit(): void {
    this.jsLd.loadExternalScript("./../assets/js/aos.js");
    this.jsLd.loadExternalScript("./../assets/js/main1.js");
  }
}
