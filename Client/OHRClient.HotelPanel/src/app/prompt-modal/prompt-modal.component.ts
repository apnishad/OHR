import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-prompt-modal',
  templateUrl: './prompt-modal.component.html',
  styleUrls: ['./prompt-modal.component.css']
})
export class PromptModalComponent {

  constructor(public modalRef: MdbModalRef<PromptModalComponent>) {}


  close(msg:string):void{
    this.modalRef.close(msg);
  }
}
