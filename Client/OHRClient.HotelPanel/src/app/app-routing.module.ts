import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContentWrapperComponent } from './content-wrapper/content-wrapper.component';
import { RoomTypesSummaryComponent } from './RoomTypes/room-types-summary/room-types-summary.component';
import { RoomTypesManipComponent } from './RoomTypes/room-types-manip/room-types-manip.component';
import { RoomsSummaryComponent } from './Rooms/rooms-summary/rooms-summary.component';
import { RoomsManipComponent } from './Rooms/rooms-manip/rooms-manip.component';
import { NewHotelInfoComponent } from './HotelInfo/new-hotel-info/new-hotel-info.component';
import { EditHotelInfoComponent } from './HotelInfo/edit-hotel-info/edit-hotel-info.component';
import { ViewHotelInfoComponent } from './HotelInfo/view-hotel-info/view-hotel-info.component';
import { HotelLocationSummaryComponent } from './HotelLocations/hotel-location-summary/hotel-location-summary.component';
import { HotelLocationManipComponent } from './HotelLocations/hotel-location-manip/hotel-location-manip.component';
import { FacilitiesSummaryComponent } from './Facilities/facilities-summary/facilities-summary.component';
import { BookingsSummaryComponent } from './Bookings/bookings-summary/bookings-summary.component';
import { BookingsManipComponent } from './Bookings/bookings-manip/bookings-manip.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'dashboard',component:ContentWrapperComponent},
  {path:'roomtypes',component:RoomTypesSummaryComponent},
  {path:'newRoomTypes',component:RoomTypesManipComponent},
  {path:'rooms',component:RoomsSummaryComponent},
  {path:'newRooms',component:RoomsManipComponent},
  {path:'newHotel',component:NewHotelInfoComponent},
  {path:'editHotel',component:EditHotelInfoComponent},
  {path:'viewHotel',component:ViewHotelInfoComponent},
  {path:'hotelLocations',component:HotelLocationSummaryComponent},
  {path:'newHotelLocations',component:HotelLocationManipComponent},
  {path:'facilities',component:FacilitiesSummaryComponent},
  {path:'newFacilities',component:FacilitiesSummaryComponent},
  {path:'bookings',component:BookingsSummaryComponent},
  {path:'newBookings',component:BookingsManipComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,]
})
export class AppRoutingModule { 

}
