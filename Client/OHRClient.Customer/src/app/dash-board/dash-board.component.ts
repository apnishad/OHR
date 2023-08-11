import { Component } from '@angular/core';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent {
  cardData:{title:string,url:string,navUrl:string}[]=[
    {title:"Rooms",url:"./../../assets/images/image_1.jpg",navUrl:"./../Rooms"},
    {title:"Bookings",url:"./../../assets/images/image_2.jpg",navUrl:"/Bookings"},
    {title:"Payments",url:"./../../assets/images/image_3.jpg",navUrl:"/Payments"},
    {title:"Invoices",url:"./../../assets/images/image_4.jpg",navUrl:"/Invoices"},
    {title:"Restaurant",url:"./../../assets/images/image_5.jpg",navUrl:"/Restaurants"},
    {title:"Reports",url:"./../../assets/images/image_6.jpg",navUrl:"/Reports"}
  ];

}
