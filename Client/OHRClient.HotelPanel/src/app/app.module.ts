import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FooterComponent } from './footer/footer.component';
import { ContentWrapperComponent } from './content-wrapper/content-wrapper.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegistrationService } from './Services/RegistrationService';
import { RoomTypesSummaryComponent } from './RoomTypes/room-types-summary/room-types-summary.component';
import { RoomTypesManipComponent } from './RoomTypes/room-types-manip/room-types-manip.component';
import {MdbModalModule} from 'mdb-angular-ui-kit/modal';
import { PromptModalComponent } from './prompt-modal/prompt-modal.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RoomsSummaryComponent } from './Rooms/rooms-summary/rooms-summary.component';
import { RoomsManipComponent } from './Rooms/rooms-manip/rooms-manip.component';
import { NewHotelInfoComponent } from './HotelInfo/new-hotel-info/new-hotel-info.component';
import { EditHotelInfoComponent } from './HotelInfo/edit-hotel-info/edit-hotel-info.component';
import { ViewHotelInfoComponent } from './HotelInfo/view-hotel-info/view-hotel-info.component';
import { HotelLocationSummaryComponent } from './HotelLocations/hotel-location-summary/hotel-location-summary.component';
import { HotelLocationManipComponent } from './HotelLocations/hotel-location-manip/hotel-location-manip.component';
import {MdbTabsModule} from 'mdb-angular-ui-kit/tabs';
import {MdbCarouselModule} from 'mdb-angular-ui-kit/carousel';
import { FacilitiesSummaryComponent } from './Facilities/facilities-summary/facilities-summary.component';
import { FacilitiesManipComponent } from './Facilities/facilities-manip/facilities-manip.component';
import { BookingsSummaryComponent } from './Bookings/bookings-summary/bookings-summary.component';
import { BookingsManipComponent } from './Bookings/bookings-manip/bookings-manip.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    FooterComponent,
    ContentWrapperComponent,
    LoginComponent,
    RegisterComponent,
    RoomTypesSummaryComponent,
    RoomTypesManipComponent,
    PromptModalComponent,
    RoomsSummaryComponent,
    RoomsManipComponent,
    NewHotelInfoComponent,
    EditHotelInfoComponent,
    ViewHotelInfoComponent,
    HotelLocationSummaryComponent,
    HotelLocationManipComponent,
    FacilitiesSummaryComponent,
    FacilitiesManipComponent,
    BookingsSummaryComponent,
    BookingsManipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MdbModalModule,
    MdbTabsModule,
    BrowserAnimationsModule,
    MdbCarouselModule,
    ToastrModule.forRoot(),
  ],
  providers: [RegistrationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
