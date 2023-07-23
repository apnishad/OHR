import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { HotelInfoViewModel } from 'src/app/DomainDTO/HotelInfoViewModel';
import { HotelInfoService } from 'src/app/Services/HotelInfoService';
import { PromptModalComponent } from 'src/app/prompt-modal/prompt-modal.component';
import { HotelInfoManipComponent } from '../hotel-info-manip/hotel-info-manip.component';
import { DTOStatus } from 'src/app/DomainDTO/DTOStatus';
import { RoomTypesManipComponent } from 'src/app/RoomTypes/room-types-manip/room-types-manip.component';

@Component({
  selector: 'app-hotel-info-summary',
  templateUrl: './hotel-info-summary.component.html',
  styleUrls: ['./hotel-info-summary.component.css']
})
export class HotelInfoSummaryComponent {
  hfInfoServ:HotelInfoViewModel[];
  modalRef: MdbModalRef<HotelInfoSummaryComponent> | null = null;
  prmptmodalRef: MdbModalRef<PromptModalComponent> | null = null;
  constructor(private hotelInfoServ:HotelInfoService,private modalService:MdbModalService,private router:Router,private toastr: ToastrService){

  }

  ngOnInit(): void 
  {
      this.hotelInfoServ.GetHotelsInfo().subscribe((data)=>{
        console.log(data);
        this.hfInfoServ = data;
      });
  }

  OnSave()
  {
      this.modalRef = this.modalService.open(HotelInfoManipComponent,{data:{hotelInfovm:{hotelId:'',hotelName:''},status:DTOStatus.NEW}});
      this.modalRef.onClose.subscribe((data:any)=>{
        console.log(data);
        if(data.sts === 'Yes'){
          this.hotelInfoServ.SaveHotelInfo(data.hinfo).subscribe((rdata)=>{
            const currentRoute = this.router.url;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate([currentRoute]); // navigate to same route
                this.toastr.success("Hotel added successfully..........","", {titleClass:"center",messageClass:"center",timeOut:1000});
            });
          });
        }
      });
  }
  OnEdit(id:number)
  {
    var hfvm:HotelInfoViewModel;
    this.hotelInfoServ.GetHotelInfo(id).subscribe((rdata)=>{
      hfvm = rdata;
      
      this.modalRef = this.modalService.open(HotelInfoManipComponent,{data:{hotelInfovm:hfvm,status:DTOStatus.EDIT}});
      this.modalRef.onClose.subscribe((data:any)=>{
        console.log(data);
        if(data.sts === 'Yes'){
          this.hotelInfoServ.EditHotelInfo(data.hinfo).subscribe((rdata)=>{
            const currentRoute = this.router.url;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate([currentRoute]); // navigate to same route
                this.toastr.success("Hotel Edited successfully..........","", {titleClass:"center",messageClass:"center",timeOut:1000});
            }); 
          });
        }
      });
    });
  }
  OnView(id:number)
  {
    var hfvm:HotelInfoViewModel;
    this.hotelInfoServ.GetHotelInfo(id).subscribe((rdata)=>{
      hfvm = rdata;
      this.modalRef = this.modalService.open(HotelInfoManipComponent,{data:{hotelInfovm:hfvm,status:DTOStatus.VIEW}});
    });
  }

  OnRemove(id:number)
  {
    var hotelInfovm:HotelInfoViewModel;
    this.prmptmodalRef = this.modalService.open(PromptModalComponent,{ignoreBackdropClick:true});
    this.prmptmodalRef.onClose.subscribe((data:any)=>{
      if(data === 'Yes')
      {
        this.hotelInfoServ.RemoveHotelInfo(id).subscribe((rdata)=>{
          const currentRoute = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([currentRoute]); // navigate to same route
              this.toastr.success("Hotel removed successfully..........","", {titleClass:"center",messageClass:"center",timeOut:1000});
          }); 
        });
      }
    });
  }
}
