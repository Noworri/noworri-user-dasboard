import { Component, ViewEncapsulation, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';



@Component({
  selector: 'app-payements',
  templateUrl: './payements.component.html',
  styleUrls: ['./payements.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PayementsComponent implements OnInit {

  modalRef: BsModalRef;

  addBankAccountconfig = {
    class: 'AddBankaccountCss'
  };

 

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  // ----------- create Bank account modale---------------------------//
  openAddBankAccountModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.addBankAccountconfig);
  }
  

}
