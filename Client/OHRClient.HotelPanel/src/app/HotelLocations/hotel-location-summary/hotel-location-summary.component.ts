import { Component, OnInit } from '@angular/core';
import { HotelAddressViewModel } from 'src/app/DomainDTO/HotelAddressViewModel';
import { HotelLocationManipComponent } from '../hotel-location-manip/hotel-location-manip.component';
import { PromptModalComponent } from 'src/app/prompt-modal/prompt-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HotelAddressService } from 'src/app/Services/HotelAddressService';
import { DTOStatus } from 'src/app/DomainDTO/DTOStatus';

@Component({
  selector: 'app-hotel-location-summary',
  templateUrl: './hotel-location-summary.component.html',
  styleUrls: ['./hotel-location-summary.component.css']
})
export class HotelLocationSummaryComponent implements OnInit {
  hotelLocationsvm:HotelAddressViewModel[];
  modalRef: MdbModalRef<HotelLocationManipComponent> | null = null;
  prmptmodalRef: MdbModalRef<PromptModalComponent> | null = null;
  constructor(private hotelAddrServ:HotelAddressService,private modalService:MdbModalService,private router:Router,private toastr: ToastrService){

  }

  ngOnInit(): void 
  {
      this.hotelAddrServ.GetHotelAddresses().subscribe((data)=>{
        this.hotelLocationsvm = data;
      });
  }

  OnClick()
  {
      this.modalRef = this.modalService.open(HotelLocationManipComponent,{data:{hotelAddrvm:{id:0,address:'',location:'',city:''},status:DTOStatus.NEW},ignoreBackdropClick:true});
      this.modalRef.onClose.subscribe((data:any)=>{
        if(data.sts === 'Yes'){
          this.hotelAddrServ.SaveHotelAddress(data.hotelAddr).subscribe((rdata)=>{
            const currentRoute = this.router.url;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate([currentRoute]); // navigate to same route
                this.toastr.success("Hotel Address added successfully..........","", {titleClass:"center",messageClass:"center",timeOut:1000});
            });
          });
        }
      });
  }
  OnEdit(id:number)
  {
    var haddrvm:HotelAddressViewModel;
    console.log(id);
    this.hotelAddrServ.GetHotelAddress(id).subscribe((rdata)=>{
      haddrvm = rdata;
      this.modalRef = this.modalService.open(HotelLocationManipComponent,{data:{hotelAddrvm:haddrvm,status:DTOStatus.EDIT},ignoreBackdropClick:true});
      this.modalRef.onClose.subscribe((data:any)=>{
        console.log("received - ");
        console.log(data);
        if(data.sts === 'Yes'){
          this.hotelAddrServ.EditHotelAddress(data.hotelAddr).subscribe((rdata)=>{
            const currentRoute = this.router.url;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate([currentRoute]); // navigate to same route
                this.toastr.success("Hotel Address Edited successfully..........","", {titleClass:"center",messageClass:"center",timeOut:1000});
            }); 
          });
        }
      });
    });
  }
  OnView(id:number)
  {
    var haddrvm:HotelAddressViewModel;
    this.hotelAddrServ.GetHotelAddress(id).subscribe((rdata)=>{
      haddrvm = rdata;
      this.modalRef = this.modalService.open(HotelLocationManipComponent,{data:{hotelAddrvm:haddrvm,status:DTOStatus.VIEW},ignoreBackdropClick:true});
    });
  }

  OnRemove(id:number)
  {
    var haddrvm:HotelAddressViewModel;
    this.prmptmodalRef = this.modalService.open(PromptModalComponent,{ignoreBackdropClick:true});
    this.prmptmodalRef.onClose.subscribe((data:any)=>{
      console.log(data);
      if(data === 'Yes')
      {
        this.hotelAddrServ.RemoveHotelAddress(id).subscribe((rdata)=>{
          const currentRoute = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([currentRoute]); // navigate to same route
              this.toastr.success("Hotel Address removed successfully..........","", {titleClass:"center",messageClass:"center",timeOut:1000});
          }); 
        });
      }
    });
  }
}
