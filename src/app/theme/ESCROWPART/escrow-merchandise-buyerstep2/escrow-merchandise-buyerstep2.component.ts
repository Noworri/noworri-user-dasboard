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
  styleUrls: ['./escrow-merchandise-buyerstep2.component.scss'],
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
  initiator_id: string;
  destinator_id: string;
  initiator_role: string;
  destinator_role: string;
  transactionType: string;
  description: string;
  deliveryPhone: string;
  transaction_ref: string;

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
    this.initiator_id = sessionData.user_uid;
    const escrowStep2Data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    this.item = escrowStep2Data.name;
    this.amount = +escrowStep2Data.price + +escrowStep2Data.noworriFee;
    this.sellerNumber = escrowStep2Data.seller;
    this.deliveryPhone = escrowStep2Data.delivery_phone;
    this.initiator_role = escrowStep2Data.role === 'Buyer' ? 'Buy' : 'Sell';
    this.destinator_role = this.initiator_role === 'Buy' ? 'Sell' : 'Buy';
    this.transactionType = escrowStep2Data.transactionType;
    this.noworriFee = escrowStep2Data.noworriFee;
    this.price = escrowStep2Data.price;
    this.description = escrowStep2Data.requirement || '';
    this.destinator_id = escrowStep2Data.destinator_id;
    this.wholeAmountPart = Math.trunc(this.amount);
    // this.decimalPart = parseFloat(
    //   Math.abs(this.amount).toString().split('.')[1]
    // );
    // if (!this.decimalPart) {
    //   this.decimalPart = '00';
    // }
    this.transactionDetails = {
      initiator_id: this.initiator_id,
      initiator_role: this.initiator_role,
      destinator_id: this.destinator_id,
      transaction_type: this.transactionType,
      delivery_phone: this.deliveryPhone,
      service: this.item,
      price: this.price,
      noworri_fees: this.noworriFee,
      total_price: this.amount,
      requirement: this.description,
      transaction_ref: '',
      etat: 4,
    };
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

  // onCardPay() {
  //   this.isValidating = true;

  //   const amount = `${this.amount}`;
  //   const body = {
  //     paymentDetails: {
  //       requestId: '4466',
  //       productCode: 'GMT112',
  //       amount: amount,
  //       currency: 'GBP',
  //       locale: 'en_AU',
  //       orderInfo: '255s353',
  //       returnUrl: 'https://web.noworri/transactions',
  //     },
  //     merchantDetails: {
  //       accessCode: '79742570',
  //       merchantID: 'ETZ001',
  //       secureSecret: 'sdsffd',
  //     },
  //     secureHash:
  //       '7f137705f4caa39dd691e771403430dd23d27aa53cefcb97217927312e77847bca6b8764f487ce5d1f6520fd7227e4d4c470c5d1e7455822c8ee95b10a0e9855',
  //   };
  //   const newBody = JSON.stringify(body);
  //   this.transactionsService
  //     .processPayment(body)
  //     .pipe(takeUntil(this.unsubscribe))
  //     .subscribe(
  //       (response) => {
  //         this.isValidating = false;
  //         if (
  //           response.response_message &&
  //           response.response_message === 'success'
  //         ) {
  //           this.createTransaction();
  //           window.location.href = `${response.response_content}`;
  //         }
  //         return response;
  //       },
  //       (error) => {
  //         this.isValidating = false;
  //         console.log(error.message);
  //       }
  //     );
  // }

  onSecureFunds() {
    this.isValidating = true;
    const transactionData = {
      email: this.email,
      amount: this.amount * 100,
    };
    this.transactionsService
      .payStackPayment(transactionData)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response: any) => {
        // vieux code Emeric regarde onSecureFunds() step 1
        window.open(
          `${response.data.authorization_url}`,
          'popup',
          'width=500,height=650'
        );
        this.transaction_ref = response.data.reference;
        this.createTransaction();
        return false;
      });
  }

  createTransaction() {
    this.transactionDetails['transaction_ref'] = this.transaction_ref;
    this.transactionsService
      .createTransaction(this.transactionDetails)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (transaction: any) => {
          setTimeout(() => {
            this.checkSuccessSecuredFunds(this.transaction_ref, transaction);
          }, 2000);
          return transaction;
        
        },
        (error) => {
          console.log(error.message);
        }
      );
  }

  checkSuccessSecuredFunds(ref, transaction) {
    this.transactionsService
      .checkTransactionStatus(ref, transaction.transaction_key)

      .pipe(takeUntil(this.unsubscribe))
      .subscribe((statusData) => {
        if (statusData.data && statusData.data.status === 'success') {
          // this.isValidating = false;
          //------J'ai fait ca juste pour contunier  j'y viendrai --//
          this.router.navigate([
            `/buyermerchandisecontrat/${transaction.transaction_key}`,
          ]);
          if (
            transaction.initiator_id &&
            transaction.initiator_id === this.initiator_id &&
            transaction.initiator_role === 'Buy'
          ) {
            this.router.navigate([
              `/buyermerchandisecontrat/${transaction.transaction_key}`,
            ]);
          } else if (
            transaction.initiator_id &&
            transaction.user_id === this.initiator_id &&
            transaction.initiator_role === 'Sell'
          ) {
            this.router.navigate([
              `/sellermerchandisecontrat/${transaction.transaction_key}`,
            ]);
          } else {
            console.log('error', transaction);
          }
        }
      });
  }
}
