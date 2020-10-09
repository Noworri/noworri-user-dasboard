import { Component, ViewEncapsulation, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { SimpleChanges, OnChanges, OnDestroy, } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionsService } from 'src/app/Service/transactions.service';
import { takeUntil } from 'rxjs/operators';
import { isEmpty } from 'lodash';
import { Subject, from } from 'rxjs';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';



const SESSION_STORAGE_KEY = 'noworri-user-session';

@Component({
  selector: 'app-payements',
  templateUrl: './payements.component.html',
  styleUrls: ['./payements.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PayementsComponent implements OnInit {

  email: string;
  name: string;
  mobile_phone: string;
  userId: string;
  unsubscribe = new Subject();
  accountDetails: object;
  form: FormGroup;
  isAdding = false;
  hasAccount: boolean;
  details: any;
  recipientDetails: object;
  currency: string;
  bankList: any;
  country: string;
  modalRef: BsModalRef;

  addBankAccountconfig = {
    class: 'AddBankaccountCss'
  };



  constructor(private modalService: BsModalService,
    private router: Router,
    private transactionService: TransactionsService,
    private fb: FormBuilder
  ) {
    const sessionData = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY));
    this.email = sessionData.email;
    this.name = sessionData.name;
    this.mobile_phone = sessionData.mobile_phone;
    this.userId = sessionData.user_uid;
    if (this.mobile_phone.startsWith('+233')) {
      this.currency = 'GHS';
      this.country = 'Ghana';
    } else {
      this.currency = 'NGN';
      this.country = 'Nigeria';
    }
  }

  ngOnInit() {
    this.getAccountDetails();
    this.getBankList(this.country);
   
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  // ----------- create Bank account modale---------------------------//
  openAddBankAccountModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.addBankAccountconfig);
  }



  getBankList(country) {
    this.transactionService.getBanks(country)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(banks => {
        return this.bankList = banks;
      });
  }

  setupForm(form: NgForm) {
    
    if (form) {
      this.bankList.filter(bank => bank.name === form.value['bankName']).forEach(value => {
        this.accountDetails = {
          bankName: form.value['bankName'],
          bankCode: value.code,
          holderName: form.value['holderName'],
          accountNo: form.value['accountNo'],
          userId: this.userId,
          recipient_code: ''
        };
        
      });
      this.createRecipient(this.accountDetails);
    }
  }


  createRecipient(accountDetails) {
    this.isAdding = true;
    this.recipientDetails = {
      type: 'nuban',
      name: accountDetails.holderName,
      description: 'Noworri Transaction',
      account_number: accountDetails.accountNo,
      bank_code: accountDetails.bankCode,
      currency: this.currency
    };
    this.transactionService.createRecipient(this.recipientDetails)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response: any) => {
        if (response.recipient_code) {
          accountDetails.recipient_code = response.recipient_code;
          this.addAccountDetails(accountDetails);
        }
        return response;
      });
  }

  addAccountDetails(accountDetails) {
    this.transactionService
      .addNewAccount(accountDetails)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response) => {
        this.isAdding = false;
        this.getAccountDetails();
        return response;
      });
  }
  getAccountDetails() {
    this.transactionService.getAccountDetails(this.userId).pipe(takeUntil(this.unsubscribe)).subscribe((details: any) => {
      if (isEmpty(details)) {
        this.hasAccount = false;
      } else {
        this.details = details;
        this.hasAccount = true;
        return details;
      }
    });
  }




  
}
