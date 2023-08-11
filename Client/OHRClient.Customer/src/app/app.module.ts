import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContribNgHostModule } from '@angular-contrib/common';
import { OwlModule } from 'ngx-owl-carousel';
import { JsLoader } from './Common/Common';
import { RoomsComponent } from './rooms/rooms.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationService } from './Services/RegistrationService';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { AuthGuard } from './Services/AuthGuard';
import { LoginService } from './Services/LoginService';
import { RoomsItemComponent } from './rooms/rooms-item/rooms-item.component';
import { RoomsService } from './Services/RoomService';
import { SingleRoomDetailsComponent } from './rooms/single-room-details/single-room-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    RoomsComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    DashBoardComponent,
    RoomsItemComponent,
    SingleRoomDetailsComponent
  ],
  imports: [
    BrowserModule,
    ContribNgHostModule,
    OwlModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [JsLoader,RegistrationService,LoginService,AuthGuard,RoomsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
