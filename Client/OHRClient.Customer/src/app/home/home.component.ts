import { Component, OnInit } from '@angular/core';
import { JsLoader } from '../Common/Common';

@Component({
  selector: 'app-home',
  host: { ngNoHost: '' },
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private jsLd:JsLoader){}
  
  ngOnInit(): void {
    this.jsLd.loadExternalScript("./../assets/js/aos.js");
    this.jsLd.loadExternalScript("./../assets/js/main1.js");
  }
  
  Images:{url:string,head1:string,head2:string}[] = [
    {url:"background-image:url(./../assets/images/bg_1.jpg);height:900px;",head1:"Welcome To Deluxe",head2:"Hotels & Resorts"},
    {url:"background-image:url(./../assets/images/bg_2.jpg);height:900px;",head1:"Enjoy A Luxury Experience",head2:"Join With Us"}];

  
  //SlideOptions = { items: 1, dots: false, nav: false,autoplay:500,loop:true,animateOut:"fadeOut"};  
  //CarouselOptions = { items: 3, dots: false, nav: false }; 
}
