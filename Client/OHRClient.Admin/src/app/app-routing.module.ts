import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContentWrapperComponent } from './content-wrapper/content-wrapper.component';
import { RoomTypesSummaryComponent } from './RoomTypes/room-types-summary/room-types-summary.component';
import { RoomTypesManipComponent } from './RoomTypes/room-types-manip/room-types-manip.component';
import { HotelInfoSummaryComponent } from './HotelInfo/hotel-info-summary/hotel-info-summary.component';
import { HotelInfoManipComponent } from './HotelInfo/hotel-info-manip/hotel-info-manip.component';
import { RoomsSummaryComponent } from './Rooms/rooms-summary/rooms-summary.component';
import { RoomsManipComponent } from './Rooms/rooms-manip/rooms-manip.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'dashboard',component:ContentWrapperComponent},
  {path:'roomtypes',component:RoomTypesSummaryComponent},
  {path:'newRoomTypes',component:RoomTypesManipComponent},
  {path:'hotelInfo',component:HotelInfoSummaryComponent},
  {path:'newHotelInfo',component:HotelInfoManipComponent},
  {path:'rooms',component:RoomsSummaryComponent},
  {path:'newRooms',component:RoomsManipComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,]
})
export class AppRoutingModule { 

}
