import {
  Component,
  OnInit,
  SimpleChanges,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { TransactionsService } from 'src/app/Service/transactions.service';
import { takeUntil } from 'rxjs/operators';
import { isEmpty } from 'lodash';
import { Subject, from } from 'rxjs';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';

const SESSION_STORAGE_KEY = 'noworri-user-session';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  AfficheAddbank: boolean;
  AfficheAddvisa: boolean;
  AfficheAddmobile: boolean;
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

  CloseAddbank: boolean;

  constructor(
    private router: Router,
    private transactionService: TransactionsService,
    private fb: FormBuilder
  ) {
    const sessionData = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY));
    this.email = sessionData.email;
    this.name = sessionData.name;
    this.mobile_phone = sessionData.mobile_phone;
    this.userId = sessionData.user_uid;
    if (this.mobile_phone.includes('233')) {
      this.currency = 'GHS';
    } else {
      this.currency = 'NGN';
    }
  }

  ngOnInit() {
    this.getAccountDetails();
    this.getBankList();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getBankList() {
    this.transactionService.getBanks()
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
          recipient_code: 'RCP_7h6n04cjjzu2lhf'
        };
      });
      this.addAccountDetails(this.accountDetails);

      // this.createRecipient(this.accountDetails);
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
      currency: 'NGN'
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
        this.AfficheAddbank = false;
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

  DisplayAddBank() {
    this.AfficheAddbank = true;
  }
  DisplayAddVisa() {
    this.AfficheAddvisa = true;
  }
  DisplayAddMobile() {
    this.AfficheAddmobile = true;
  }

  HideAddBank() {
    this.AfficheAddbank = false;
  }
  HideAddVisa() {
    this.AfficheAddvisa = false;
  }
  HideAddMobile() {
    this.AfficheAddmobile = false;
  }
}
