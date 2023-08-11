import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { DTOStatus } from 'src/app/DomainDTO/DTOStatus';
import { ImageViewModel } from 'src/app/DomainDTO/ImageViewModel';
import { RoomsViewModel } from 'src/app/DomainDTO/RoomsViewModel';
import { HotelAddressService } from 'src/app/Services/HotelAddressService';
import { ImageService } from 'src/app/Services/ImageService';
import { RoomTypesService } from 'src/app/Services/RoomTypesService';

@Component({
  selector: 'app-rooms-manip',
  templateUrl: './rooms-manip.component.html',
  styleUrls: ['./rooms-manip.component.css']
})
export class RoomsManipComponent {
  roomForm:FormGroup;
  uForm:FormGroup;
  roomvm:RoomsViewModel;
  status:DTOStatus;
  sd:boolean=true;
  imgvm:ImageViewModel;
  roomTypeList:{rmTypeId:string, rmTypeName:string}[] = [];
  roomLocationList:{rmLocId:number, rmLocationName:string}[] = [];
  constructor(private rm:FormBuilder,private rmTypeServe:RoomTypesService,private imgServ:ImageService,public modalRef:MdbModalRef<RoomsManipComponent>,private rmLocServ:HotelAddressService){
    this.rmTypeServe.GetRoomTypes().subscribe((data)=>{
      for(var rmtype of data){
        this.roomTypeList.push({rmTypeId:rmtype.id,rmTypeName:rmtype.name});
      }
      console.log(this.roomTypeList);
    });

    this.rmLocServ.GetHotelAddresses().subscribe((data)=>{
      for(var rmLoc of data){
        this.roomLocationList.push({rmLocId:rmLoc.id,rmLocationName:rmLoc.location});
      }
      console.log(this.roomLocationList);
    });
    this.sd = true;
    console.log(this.sd);
  }
  ngOnInit(): void {

    console.log(this.roomvm.id);
    this.imgServ.GetImagesByRoomId(this.roomvm.id).subscribe((data)=>{
      this.roomvm.images = data;
      console.log(data);
    });

    this.roomForm = this.rm.group({
      id:[this.roomvm.id],
      number:[this.roomvm.number,Validators.required],
      available:[this.roomvm.available],
      maximumGuests:[this.roomvm.maximumGuests,Validators.required],
      price:[this.roomvm.price,Validators.required],
      roomTypeId:new FormControl({value:this.roomvm.roomTypeId,disabled:this.status==2},[Validators.required]),
      roomLocId:new FormControl({value:this.roomvm.roomLocId,disabled:this.status==2},[Validators.required]),
      description:[this.roomvm.description]
    });
    this.uForm = this.rm.group(
      {
        id:[''],
        ufile:['',Validators.required]
      }
    );
    this.imgvm = {id:"",imgData:"",roomId:""};
  }

  OnSubmit(frm:FormGroup)
  {
      var rm:RoomsViewModel = {
        id:this.roomForm.controls['id'].value,
        number:this.roomForm.controls['number'].value,
        maximumGuests:this.roomForm.controls['maximumGuests'].value,
        price:this.roomForm.controls['price'].value,
        available : true,
        description:this.roomForm.controls['description'].value,
        roomTypeId:this.roomForm.controls['roomTypeId'].value,
        roomLocId:this.roomForm.controls["roomLocId"].value,
        roomType:null,
        roomLoc:null,
        images:null
      };
      var response:{sts:string,rms:RoomsViewModel}={sts:'Yes',rms:rm};
      this.modalRef.close(response);
  }

  OpenFile(rFile:any){
    var reader = new FileReader();
    reader.onload = ()=>{
      this.imgvm.imgData = reader.result.toString();
      console.log(this.imgvm.imgData);
    }
    reader.readAsDataURL(rFile.files[0]);
  }

  OnUpLoad(uForm:FormGroup)
  {
    this.imgvm.roomId = this.roomvm.id;
    console.log(this.imgvm);
    this.imgServ.SaveImage(this.imgvm).subscribe((data)=>{
      console.log(data);
    });
  }

  close():void{
    this.modalRef.close({sts:'No'})
  }
}
