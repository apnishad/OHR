import { Component } from '@angular/core';
import { FacilitiesViewModel } from 'src/app/DomainDTO/FacilitiesViewModel';
import { FacilitiesManipComponent } from '../facilities-manip/facilities-manip.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { PromptModalComponent } from 'src/app/prompt-modal/prompt-modal.component';
import { FacilitiesService } from 'src/app/Services/FacilitiesService';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DTOStatus } from 'src/app/DomainDTO/DTOStatus';

@Component({
  selector: 'app-facilities-summary',
  templateUrl: './facilities-summary.component.html',
  styleUrls: ['./facilities-summary.component.css']
})
export class FacilitiesSummaryComponent {
  fctsvm:FacilitiesViewModel[];
  modalRef: MdbModalRef<FacilitiesManipComponent> | null = null;
  prmptmodalRef: MdbModalRef<PromptModalComponent> | null = null;
  constructor(private fctsServ:FacilitiesService,private modalService:MdbModalService,private router:Router,private toastr: ToastrService){

  }

  ngOnInit(): void 
  {
      this.fctsServ.GetFacilities().subscribe((data)=>{
        this.fctsvm = data;
        console.log(data);
      });
  }

  OnClick()
  {
      this.modalRef = this.modalService.open(FacilitiesManipComponent,{data:{facvm:{id:'',icon:'',name:''},status:DTOStatus.NEW},ignoreBackdropClick:true});
      this.modalRef.onClose.subscribe((data:any)=>{
        if(data.sts === 'Yes'){
          this.fctsServ.SaveFacilities(data.fcts).subscribe((rdata)=>{
            const currentRoute = this.router.url;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate([currentRoute]); // navigate to same route
                this.toastr.success("Facility added successfully..........","", {titleClass:"center",messageClass:"center",timeOut:1000});
            });
          });
        }
      });
  }
  OnEdit(id:string)
  {
    var fctvm:FacilitiesViewModel;
    console.log(id);
    this.fctsServ.GetFacility(id).subscribe((rdata)=>{
      fctvm = rdata;
      this.modalRef = this.modalService.open(FacilitiesManipComponent,{data:{facvm:fctvm,status:DTOStatus.EDIT},ignoreBackdropClick:true});
      this.modalRef.onClose.subscribe((data:any)=>{
        console.log("received - ");
        console.log(data);
        if(data.sts === 'Yes'){
          this.fctsServ.EditFacilities(data.fcts).subscribe((rdata)=>{
            const currentRoute = this.router.url;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate([currentRoute]); // navigate to same route
                this.toastr.success("Facility Edited successfully..........","", {titleClass:"center",messageClass:"center",timeOut:1000});
            }); 
          });
        }
      });
    });
  }
  OnView(id:string)
  {
    var fctvm:FacilitiesViewModel;
    this.fctsServ.GetFacility(id).subscribe((rdata)=>{
      fctvm = rdata;
      this.modalRef = this.modalService.open(FacilitiesManipComponent,{data:{facvm:fctvm,status:DTOStatus.VIEW},ignoreBackdropClick:true});
    });
  }

  OnRemove(id:string)
  {
    var fctvm:FacilitiesViewModel;
    this.prmptmodalRef = this.modalService.open(PromptModalComponent,{ignoreBackdropClick:true});
    this.prmptmodalRef.onClose.subscribe((data:any)=>{
      console.log(data);
      if(data === 'Yes')
      {
        this.fctsServ.RemoveFacilities(id).subscribe((rdata)=>{
          const currentRoute = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([currentRoute]); // navigate to same route
              this.toastr.success("Facility removed successfully..........","", {titleClass:"center",messageClass:"center",timeOut:1000});
          }); 
        });
      }
    });
  }
}
