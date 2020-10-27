import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionsService } from 'src/app/Service/transactions.service';
import { Subject } from 'rxjs';
import { FormGroup, NgForm } from '@angular/forms';
import { NoworriSearchService } from 'src/app/Service/noworri-search.service';
import { isEmpty } from 'lodash';
import { AuthserviceService } from 'src/app/Service/authservice.service';
import { GeoLocationService } from 'src/app/Service/geo-location.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

const SESSION_STORAGE_KEY = 'noworri-user-session';

@Component({
  selector: 'app-seller-merchandise-contrat',
  templateUrl: './seller-merchandise-contrat.component.html',
  styleUrls: ['./seller-merchandise-contrat.component.scss']
})
export class SellerMerchandiseContratComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject();
  initiator_phone: string;

  tableData: any;
  userRole: string;
  storedTransactionDetails: any;
  amount: any;
  noworriFee: any;
  totalAmount: any;
  transactionType: string;
  userId: string;
  columns: any[];
  isValidating = false;
  isUpdating = false;
  isFundsReleased = false;
  isCancelled = false;
  isUpdatingDelivery = false;
  prefixCountryCode: string;


  // ---- bak stuff --- //
  email: string;
  name: string;
  mobile_phone: string;
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

    // ---for contry location ----//
    countryData: any;
    locationData: string;
    displayInput: boolean;


  buyerPhone: string;
  description: string;
  item: string;
  deliveryPhone: string;
  transactionKey: string;
  transactionId: string;
  networkList: any;
  hasWithdrawn = false;
  paymentData: { amount: any; currency: string; transactionID: string; };
  errorMessage: any;

  constructor(
    private transactionsService: TransactionsService,
    private router: Router,
    private route: ActivatedRoute,
    private geoLocationService: GeoLocationService,
    private userService: AuthserviceService,
    private modalService: BsModalService,
  ) {
    this.transactionKey = this.route.snapshot.paramMap.get('transactionKey');
    const sessionData = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY));
    this.userId = sessionData.user_uid;
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
    this.loadUserTransaction(this.transactionKey);
    this.getDataLocation();
    this.getAccountDetails();
    this.getBankList(this.country);

  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getNoworriFee(price: number) {
    return ((price / 100) * 1.98);
  }

  cancelOrder() {
    this.isValidating = true;
    this.transactionsService.cancelOrder(this.transactionKey).pipe(takeUntil(this.unsubscribe$)).subscribe(
      response => {
        setTimeout(() => {
          this.isValidating = false;
          this.loadUserTransaction(this.transactionKey);
        }, 5000);
        return response;
      },
      error => {
        this.isValidating = false;
        console.log(error);
        // this.router.navigate(['transactions']);
      }
    );
  }

  onUpdateDeliveryPhone() {
    this.isUpdatingDelivery = this.isUpdatingDelivery === true ? false : true;
  }

  updateDeliveryPhone(form: NgForm) {
    this.isUpdating = true;
    const newDeliveryNo = document.getElementsByTagName('input')[1].value;
    const telInputPlaceholderInputValue = document
      .getElementsByTagName('input')[1]
      .getAttribute('placeholder');
    if (telInputPlaceholderInputValue === '023 123 4567') {
      this.prefixCountryCode = '+233';
    } else if (telInputPlaceholderInputValue === '0802 123 4567') {
      this.prefixCountryCode = '+234';
    } else if (telInputPlaceholderInputValue === '01 23 45 67' ) {
      this.prefixCountryCode = '+225';
    }
    const newDelivery = `${this.prefixCountryCode}${newDeliveryNo}`;
    this.transactionsService.updateDeliveryPhone(this.transactionId, newDelivery).pipe(takeUntil(this.unsubscribe$)).subscribe(
      response => {
        setTimeout(() => {
          this.isUpdating = false;
          this.loadUserTransaction(this.transactionKey);
        }, 5000);
        return response;
      },
      error => {
        this.isValidating = false;
        console.log(error);
        this.loadUserTransaction(this.transactionKey);
      }
    );
  }

  getBuyerDetails(buyerUid) {
      this.userService.getUserDetailsById(buyerUid)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (user) => {
          if (isEmpty(user)) {
            this.buyerPhone  = 'N/A';
          } else {
            this.buyerPhone = user.mobile_phone;
          }
          return this.initiator_phone;
        },
        (error) => {
          console.log('Error %j', error.message);
        }
      );
  }

  getDataLocation() {
    new Promise((resolve) => {
      this.geoLocationService.getLocation().subscribe((data) => {
        resolve(this.locationData = data['country']);
      });
    }).then(() => {
      this.countryData = {
        preferredCountries: [`${this.locationData}`],
        localizedCountries: { ng: 'Nigeria', gh: 'Ghana', ci: 'Cote D\'Ivoire' },
        onlyCountries: ['GH', 'NG', 'CI']
      };
    });
  }

  getBankList(country) {
    this.transactionsService.getBanks(country)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(banks => {
        this.bankList = banks.filter(bank => bank.type === 'ghipss');
        this.networkList = banks.filter(bank => bank.type === 'mobile_money');
      });
  }

  onWithdraw(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.addBankAccountconfig);
  }

  loadUserTransaction(transaction_id: string) {
    this.transactionsService
      .getUserTransaction(transaction_id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (transactions) => {
          this.tableData = transactions;
          transactions.forEach((details) => {
            this.transactionType = details.transaction_type.toLowerCase();
            this.userRole = 'Sell';
            this.amount = parseInt(details.price, 10).toFixed(2);
            this.noworriFee = this.getNoworriFee(this.amount).toFixed(2);
            this.totalAmount = parseInt(this.amount, 10) - parseInt(this.noworriFee, 10);
            this.totalAmount = this.totalAmount.toFixed(2);
            this.item = details.name;
            this.getBuyerDetails(details.initiator_id);
            this.description = details.requirement;
            this.transactionId = details.id;
            this.deliveryPhone = details.delivery_phone ? details.delivery_phone : 'N/A';
            this.paymentData = {
              amount: this.totalAmount,
              currency: this.currency,
              transactionID: this.transactionId
            };
            if (details.etat === '3') {
              this.isFundsReleased = true;
            }
            if (details.etat === '0') {
              this.isCancelled = true;
            }
            if (details.etat === '5') {
              this.isFundsReleased = true;
              this.hasWithdrawn = true;
            }
          });
        },
        (error) => console.log(error.message)
      );
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
    this.transactionsService.createRecipient(this.recipientDetails)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response: any) => {
        if (response.data && response.data.recipient_code) {
          accountDetails.recipient_code = response.data.recipient_code;
          this.addAccountDetails(accountDetails);
        } if (response.status === false) {
          this.errorMessage = response.message;
        }
        return response;
      });
  }

  addAccountDetails(accountDetails) {
    this.transactionsService
      .addNewAccount(accountDetails)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response) => {
        this.isAdding = false;
        this.getAccountDetails();
        return response;
      });
  }
  getAccountDetails() {
    this.transactionsService.getAccountDetails(this.userId).pipe(takeUntil(this.unsubscribe)).subscribe((details: any) => {
      if (isEmpty(details)) {
        this.hasAccount = false;
      } else {
        this.details = details;
        this.hasAccount = true;
        return details;
      }
    });
  }

    // ----------- create Bank account modale---------------------------//
    openAddBankAccountModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template, this.addBankAccountconfig);
    }
}
