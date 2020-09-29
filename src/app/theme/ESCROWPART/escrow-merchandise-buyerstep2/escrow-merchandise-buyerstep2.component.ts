import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TransactionsService } from 'src/app/Service/transactions.service';
import { takeUntil, isEmpty } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

const LOCAL_STORAGE_KEY = 'merchandise-escrow-1';
const SESSION_STORAGE_KEY = 'noworri-user-session';

@Component({
  selector: 'app-escrow-merchandise-buyerstep2',
  templateUrl: './escrow-merchandise-buyerstep2.component.html',
  styleUrls: ['./escrow-merchandise-buyerstep2.component.scss']
})
export class EscrowMerchandiseBuyerstep2Component implements OnInit {
  CreditCard: boolean;
  Mobilewalet: boolean;
  Form: FormGroup;
  price: number;
  noworriFee: number;
  amount: number;
  item: string;
  sellerNumber: string;
  paymentResponse: any;
  isValidating = false;
  transactionDetails: any;
  email: string;
  first_name: string;
  name: string;
  mobile_phone: string;
  user_id: string;
  owner_id: string;
  user_role: string;
  owner_role: string;
  transactionType: string;
  description: string;
  deliveryPhone: string;

  wholeAmountPart: number;
  decimalPart: any;

  unsubscribe = new Subject();

  constructor(
    private formbuilder: FormBuilder,
    private transactionsService: TransactionsService,
    private router: Router
  ) {
    const sessionData = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY));
    this.first_name = sessionData.first_name;
    this.email = sessionData.email;
    this.name = sessionData.name;
    this.mobile_phone = sessionData.mobile_phone;
    this.deliveryPhone = sessionData.delivery;
    this.user_id = sessionData.user_uid;
    const escrowStep2Data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    this.item = escrowStep2Data.item;
    this.amount = escrowStep2Data.amount;
    this.sellerNumber = escrowStep2Data.seller;
    this.user_role = escrowStep2Data.role === 'Buyer' ? 'Buy' : 'Sell';
    this.owner_role = this.user_role === 'Buy' ? 'Sell' : 'Buy';
    this.transactionType = escrowStep2Data.transactionType;
    this.noworriFee = escrowStep2Data.noworriFee;
    this.price = escrowStep2Data.price;
    this.description = escrowStep2Data.description || '';
    this.owner_id = escrowStep2Data.owner_id;
    this.wholeAmountPart = Math.trunc(this.amount);
    this.decimalPart = parseFloat(
      Math.abs(this.amount).toString().split('.')[1]
    );
    if (!this.decimalPart) {
      this.decimalPart = '00';
    }
    this.transactionDetails = {
      user_id: this.user_id,
      user_role: this.user_role,
      user_phone: this.mobile_phone,
      owner_id: this.owner_id,
      owner_role: this.owner_role,
      owner_phone: this.sellerNumber,
      transaction_type: this.transactionType,
      deadline_type: this.deliveryPhone,
      service: this.item,
      price: this.price,
      noworri_fees: this.noworriFee,
      total_price: this.amount,
      requirement: this.description,
      etat: 4
    };
  }

  onMobilePay() {
    this.transactionsService.makeMomoPayment().pipe(takeUntil(this.unsubscribe)).subscribe(
      response => {
        this.createTransaction(this.transactionDetails);
        setTimeout(() => {
          this.router.navigate(['transactions']);
        }, 5000);
      },
      error => console.log(error)
    );
  }

  ngOnInit() {
    this.initCreditOrWallet();
    this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (
          !event.url.startsWith('/escrowmerchandisestep1') &&
          !event.url.startsWith('/transactions')
        ) {
          this.clearLocalStorage();
        }
      }
    });
  }

  goBack() {
    window.history.back();
  }

  clearLocalStorage() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  initCreditOrWallet() {
    this.Form = this.formbuilder.group({
      creditCardValue: '',
    });
    const RadioValue = this.Form.get('creditCardValue').value;
    if (RadioValue === '') {
      this.Mobilewalet = true;
    }
  }

  DisplayCardOrWallet() {
    const RadioValue = this.Form.get('creditCardValue').value;
    if (RadioValue === 'creditCard') {
      this.CreditCard = true;
      this.Mobilewalet = false;
    } else if (RadioValue === 'mobileWallet') {
      this.Mobilewalet = true;
      this.CreditCard = false;
    }
  }

  onCardPay() {
    this.isValidating = true;

    const amount = `${this.amount}`;
    const body = {
      paymentDetails: {
        requestId: '4466',
        productCode: 'GMT112',
        amount: amount,
        currency: 'GBP',
        locale: 'en_AU',
        orderInfo: '255s353',
        returnUrl: 'https://web.noworri/transactions',
      },
      merchantDetails: {
        accessCode: '79742570',
        merchantID: 'ETZ001',
        secureSecret: 'sdsffd',
      },
      secureHash:
        '7f137705f4caa39dd691e771403430dd23d27aa53cefcb97217927312e77847bca6b8764f487ce5d1f6520fd7227e4d4c470c5d1e7455822c8ee95b10a0e9855',
    };
    const newBody = JSON.stringify(body);
    this.transactionsService
      .processPayment(body)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (response) => {
          this.isValidating = false;
          if (
            response.response_message &&
            response.response_message === 'success'
          ) {
            this.createTransaction(this.transactionDetails);
            window.location.href = `${response.response_content}`;
          }
          return response;
        },
        (error) => {
          this.isValidating = false;
          console.log(error.message);
        }
      );
  }

  createTransaction(transactionDetails) {
    this.transactionsService
      .createTransaction(transactionDetails)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response) => {
        return response;
      },
        error => {
          console.log(error.message);
        }
      );
  }

}