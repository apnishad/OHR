import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { RoomTypesViewModel } from 'src/app/DomainDTO/RoomTypesViewModel';
import { RoomTypesService } from 'src/app/Services/RoomTypesService';
import { RoomTypesManipComponent } from '../room-types-manip/room-types-manip.component';
import { DTOStatus } from 'src/app/DomainDTO/DTOStatus';
import { Router } from '@angular/router';
import { PromptModalComponent } from 'src/app/prompt-modal/prompt-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-room-types-summary',
  templateUrl: './room-types-summary.component.html',
  styleUrls: ['./room-types-summary.component.css']
})
export class RoomTypesSummaryComponent implements OnInit {
  roomTypes:RoomTypesViewModel[];
  modalRef: MdbModalRef<RoomTypesManipComponent> | null = null;
  prmptmodalRef: MdbModalRef<PromptModalComponent> | null = null;
  constructor(private rmTypeServ:RoomTypesService,private modalService:MdbModalService,private router:Router,private toastr: ToastrService){

  }

  ngOnInit(): void 
  {
      this.rmTypeServ.GetRoomTypes().subscribe((data)=>{
        this.roomTypes = data;
      });
  }

  OnClick()
  {
      this.modalRef = this.modalService.open(RoomTypesManipComponent,{data:{roomTypevm:{id:'',name:'',basePrice:'',description:''},status:DTOStatus.NEW}});
      this.modalRef.onClose.subscribe((data:any)=>{
        if(data.sts === 'Yes'){
          this.rmTypeServ.SaveRoomTypes(data.rmType).subscribe((rdata)=>{
            const currentRoute = this.router.url;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate([currentRoute]); // navigate to same route
                this.toastr.success("RoomTypes added successfully..........","", {titleClass:"center",messageClass:"center",timeOut:1000});
            });
          });
        }
      });
  }
  OnEdit(id:string)
  {
    var rmTypevm:RoomTypesViewModel;
    console.log(id);
    this.rmTypeServ.GetRoomType(id).subscribe((rdata)=>{
      rmTypevm = rdata;
      this.modalRef = this.modalService.open(RoomTypesManipComponent,{data:{roomTypevm:rmTypevm,status:DTOStatus.EDIT}});
      this.modalRef.onClose.subscribe((data:any)=>{
        console.log("received - ");
        console.log(data);
        if(data.sts === 'Yes'){
          this.rmTypeServ.EditRoomTypes(data.rmType).subscribe((rdata)=>{
            const currentRoute = this.router.url;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate([currentRoute]); // navigate to same route
                this.toastr.success("RoomTypes Edited successfully..........","", {titleClass:"center",messageClass:"center",timeOut:1000});
            }); 
          });
        }
      });
    });
  }
  OnView(id:string)
  {
    var rmTypevm:RoomTypesViewModel;
    this.rmTypeServ.GetRoomType(id).subscribe((rdata)=>{
      rmTypevm = rdata;
      this.modalRef = this.modalService.open(RoomTypesManipComponent,{data:{roomTypevm:rmTypevm,status:DTOStatus.VIEW}});
    });
  }

  OnRemove(id:string)
  {
    var rmTypevm:RoomTypesViewModel;
    this.prmptmodalRef = this.modalService.open(PromptModalComponent,{ignoreBackdropClick:true});
    this.prmptmodalRef.onClose.subscribe((data:any)=>{
      console.log(data);
      if(data === 'Yes')
      {
        this.rmTypeServ.RemoveRoomTypes(id).subscribe((rdata)=>{
          const currentRoute = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([currentRoute]); // navigate to same route
              this.toastr.success("RoomTypes removed successfully..........","", {titleClass:"center",messageClass:"center",timeOut:1000});
          }); 
        });
      }
    });
  }

  
}
