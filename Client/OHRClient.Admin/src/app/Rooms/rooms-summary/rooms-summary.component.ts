import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { RoomsViewModel } from 'src/app/DomainDTO/RoomsViewModel';
import { RoomsService } from 'src/app/Services/RoomsService';
import { PromptModalComponent } from 'src/app/prompt-modal/prompt-modal.component';
import { RoomsManipComponent } from '../rooms-manip/rooms-manip.component';
import { DTOStatus } from 'src/app/DomainDTO/DTOStatus';

@Component({
  selector: 'app-rooms-summary',
  templateUrl: './rooms-summary.component.html',
  styleUrls: ['./rooms-summary.component.css']
})
export class RoomsSummaryComponent {
  rooms:RoomsViewModel[];
  modalRef: MdbModalRef<RoomsManipComponent> | null = null;
  prmptmodalRef: MdbModalRef<PromptModalComponent> | null = null;
  constructor(private rmServ:RoomsService,private modalService:MdbModalService,private router:Router,private toastr: ToastrService){

  }
  
  ngOnInit(): void 
  {
      this.rmServ.GetRooms().subscribe((data)=>{
        this.rooms = data;
      });
  }


  OnSave(){
    this.modalRef = this.modalService.open(RoomsManipComponent,{data:{roomvm:{id:"",roomNumber:"",maximumGuests:"",price:"",description:"",roomTypeId:""},status:DTOStatus.NEW},ignoreBackdropClick:true,modalClass:'modal-lg'});
      this.modalRef.onClose.subscribe((data:any)=>{
        if(data.sts === 'Yes'){
          this.rmServ.SaveRoom(data.rms).subscribe((rdata)=>{
            const currentRoute = this.router.url;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate([currentRoute]); // navigate to same route
                this.toastr.success("RoomTypes added successfully..........","", {titleClass:"center",messageClass:"center",timeOut:1000});
            });
          });
        }
      });
  }

  OnEdit(id:number){
    var rmvm:RoomsViewModel;
    console.log(id);
    this.rmServ.GetRoom(id).subscribe((rdata)=>{
      rmvm = rdata;
      this.modalRef = this.modalService.open(RoomsManipComponent,{data:{roomvm:rmvm,status:DTOStatus.EDIT},ignoreBackdropClick:true});
      this.modalRef.onClose.subscribe((data:any)=>{
        console.log("received - ");
        console.log(data);
        if(data.sts === 'Yes'){
          this.rmServ.EditRoom(data.rms).subscribe((rdata)=>{
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

  OnView(id:number){
    var rmvm:RoomsViewModel;
    this.rmServ.GetRoom(id).subscribe((rdata)=>{
      rmvm = rdata;
      this.modalRef = this.modalService.open(RoomsManipComponent,{data:{roomvm:rmvm,status:DTOStatus.VIEW},ignoreBackdropClick:true});
    });
  }

  OnRemove(id:number){
    var rmvm:RoomsViewModel;
    this.prmptmodalRef = this.modalService.open(PromptModalComponent,{ignoreBackdropClick:true});
    this.prmptmodalRef.onClose.subscribe((data:any)=>{
      console.log(data);
      if(data === 'Yes')
      {
        this.rmServ.RemoveRoom(id).subscribe((rdata)=>{
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
