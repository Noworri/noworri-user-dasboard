import { Component, OnInit } from '@angular/core'
import { TemplateRef } from '@angular/core'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  modalRef: BsModalRef | null;
  modalRef2: BsModalRef;

  constructor (private modalService: BsModalService) {}

  ngOnInit () {}
  
  openModal1(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, { class: 'modal-sm' });
  }
  closeFirstModal() {
    if (!this.modalRef) {
      return;
    }
 
    this.modalRef.hide();
    this.modalRef = null;
  }

  openModal3(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{ class: 'modal-sm' });
  }
  openModal4(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{ class: 'modal-sm' });
  } 
}
