import { Component } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { BookingViewModel } from 'src/app/DomainDTO/BookingViewModel';
import { BookingsManipComponent } from '../bookings-manip/bookings-manip.component';
import { PromptModalComponent } from 'src/app/prompt-modal/prompt-modal.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/app/Services/BookingService';
import { DTOStatus } from 'src/app/DomainDTO/DTOStatus';

@Component({
  selector: 'app-bookings-summary',
  templateUrl: './bookings-summary.component.html',
  styleUrls: ['./bookings-summary.component.css']
})
export class BookingsSummaryComponent {
  bookingsvm:BookingViewModel[];
  modalRef: MdbModalRef<BookingsManipComponent> | null = null;
  prmptmodalRef: MdbModalRef<PromptModalComponent> | null = null;
  constructor(private bkgServ:BookingService,private modalService:MdbModalService,private router:Router,private toastr: ToastrService){

  }

  ngOnInit(): void 
  {
      this.bkgServ.GetBookings().subscribe((data)=>{
        this.bookingsvm = data;
      });
  }

  
  OnEdit(id:string)
  {
    var bkngvm:BookingViewModel;
    console.log(id);
    this.bkgServ.GetBooking(id).subscribe((rdata)=>{
      bkngvm = rdata;
      console.log(bkngvm);
      this.modalRef = this.modalService.open(BookingsManipComponent,{data:{bookvm:bkngvm,status:DTOStatus.EDIT},ignoreBackdropClick:true});
      this.modalRef.onClose.subscribe((data:any)=>{
        console.log("received - ");
        console.log(data);
        if(data.sts === 'Yes'){
          this.bkgServ.EditBooking(data.bkng).subscribe((rdata)=>{
            const currentRoute = this.router.url;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate([currentRoute]); // navigate to same route
                this.toastr.success("Booking Edited successfully..........","", {titleClass:"center",messageClass:"center",timeOut:1000});
            }); 
          });
        }
      });
    });
  }
  OnView(id:string)
  {
    var bkngvm:BookingViewModel;
    this.bkgServ.GetBooking(id).subscribe((rdata)=>{
      bkngvm = rdata;
      this.modalRef = this.modalService.open(BookingsManipComponent,{data:{bookvm:bkngvm,status:DTOStatus.VIEW},ignoreBackdropClick:true});
    });
  }

  OnRemove(id:string)
  {
    var bkngvm:BookingViewModel;
    this.prmptmodalRef = this.modalService.open(PromptModalComponent,{ignoreBackdropClick:true});
    this.prmptmodalRef.onClose.subscribe((data:any)=>{
      console.log(data);
      if(data === 'Yes')
      {
        this.bkgServ.RemoveBooking(id).subscribe((rdata)=>{
          const currentRoute = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([currentRoute]); // navigate to same route
              this.toastr.success("Booking removed successfully..........","", {titleClass:"center",messageClass:"center",timeOut:1000});
          }); 
        });
      }
    });
  }
}
