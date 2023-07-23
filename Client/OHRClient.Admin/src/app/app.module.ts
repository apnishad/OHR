import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
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
import { HotelInfoSummaryComponent } from './HotelInfo/hotel-info-summary/hotel-info-summary.component';
import { HotelInfoManipComponent } from './HotelInfo/hotel-info-manip/hotel-info-manip.component';
import { RoomsSummaryComponent } from './Rooms/rooms-summary/rooms-summary.component';
import { RoomsManipComponent } from './Rooms/rooms-manip/rooms-manip.component';

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
    HotelInfoSummaryComponent,
    HotelInfoManipComponent,
    RoomsSummaryComponent,
    RoomsManipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MdbModalModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [RegistrationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
