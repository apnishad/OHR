import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ContactComponent } from './contact/contact.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { AuthGuard } from './Services/AuthGuard';
import { SingleRoomDetailsComponent } from './rooms/single-room-details/single-room-details.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'about',component:AboutComponent},
  {path:'rooms',component:RoomsComponent},
  {path:'contact',component:ContactComponent},
  {path:'dashboard',canActivate:[AuthGuard],component:DashBoardComponent},
  {path:'singleroom/:rid',canActivate:[AuthGuard],component:SingleRoomDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
