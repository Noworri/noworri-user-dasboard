import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { TransactionsService } from 'src/app/Service/transactions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {isEmpty} from 'lodash'; 
import { NoworriSearchService } from 'src/app/Service/noworri-search.service';
import { CompanyReference } from 'src/app/Service/reference-data.interface';
import { AuthserviceService } from 'src/app/Service/authservice.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';

const SESSION_STORAGE_KEY = 'noworri-user-session';

@Component({
  selector: 'app-buyer-merchandise-contrat',
  templateUrl: './buyer-merchandise-contrat.component.html',
  styleUrls: ['./buyer-merchandise-contrat.component.scss'],
})
export class BuyerMerchandiseContratComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject();

  destinator_id: string;
  tableData: any;
  userRole: string;
  currency: string;
  storedTransactionDetails: any;
  amount: any;
  totalAmount: any;
  noworriFee: any;
  transactionType: string;
  transactionId: string;
  userId: string;
  columns: any[];
  mobileWallet = false;
  isSecuring = false;
  isValidating = false;
  isFundsReleased = false;
  isCancelled = false;
  isPending = false;
  isValidCode = true;
  hasDeliveryPhone: boolean;
  recipientCode: string;
  isFundsSecured = true;
  transaction_ref: string;
  email: string;
  first_name: string;
  name: string;
  mobile_phone: string;
  initiator_id: string;
  template: TemplateRef<any>;


  sellerPhone: string;
  description: string;
  item: string;
  deliveryPhone: string;
  transactionKey: string;
  modalRef: BsModalRef;

  constructor(
    private transactionsService: TransactionsService,
    private router: Router,
    private route: ActivatedRoute,
    private companyService: NoworriSearchService,
    private userService: AuthserviceService,
    private modalService: BsModalService,
  ) {
    this.transactionKey = this.route.snapshot.paramMap.get('transactionKey');
    const sessionData = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY));
    this.first_name = sessionData.first_name;
    this.email = sessionData.email;
    this.name = sessionData.name;
    this.mobile_phone = sessionData.mobile_phone;
    this.initiator_id = sessionData.user_uid;
    if (this.mobile_phone.includes('233')) {
      this.currency = 'GHS';
    } else {
      this.currency = 'NGN';
    }

  }

  ngOnInit() {
    this.loadUserTransaction(this.transactionKey);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onReleaseFunds(template) {
    this.openModal(template);
  }

  onInitiateRelease(form: NgForm) {
    const code = form.value['otp'];
    const releaseData = {
      transaction_id: this.transactionId,
      release_code: code,
      currency: this.currency
    };
    this.verifyReleaseCode(releaseData);
  }

  verifyReleaseCode(releaseData) {
    this.transactionsService.verifyReleaseCode(releaseData).pipe(takeUntil(this.unsubscribe$))
    .subscribe((response: any) => {
      if (response.data && response.data.status === 'success') {
        this.modalRef.hide();
        this.loadUserTransaction(this.transactionKey);
        // this.initiateRelease(this.transactionKey);
      } else {
        this.isValidCode = false;
      }
    });
  }

  openModal(template: TemplateRef<any>) {
    this.template = template;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg' })
    );
  }

  releaseFunds(transaction_id) {
    this.isValidating = true;
    this.transactionsService.releaseFunds(transaction_id).pipe(takeUntil(this.unsubscribe$)).subscribe(
      response => {
        setTimeout(() => {
          this.isValidating = false;
          this.isFundsReleased = true;
          this.router.navigate(['transactions']);
        }, 5000);
        return response;
      }
    );
  }

  initiateRefund(transaction_id) {
    const data = {
      amount: this.amount,
      transaction_ref: transaction_id,
      currency: 'GHS',
    };
    // this.isValidating = true;
    this.transactionsService.initiateRefundPaystack(data).pipe(takeUntil(this.unsubscribe$)).subscribe(
      response => {
        console.log(response);
        return response;
      }
    );
  }

  getPaymentRecipient(sellerId) {
    this.transactionsService
      .getAccountDetails(sellerId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((details: any) => {
        if (details) {
          this.recipientCode = details[0].recipient_code;
        }
        return this.recipientCode;
      });
  }

  getSellerNoworriFee(price: number) {
    return (price / 100) * 1.98;
  }

  initiateRelease(transactionId) {
    const fee = this.getSellerNoworriFee(this.amount);
    const sellerPayment = parseInt(this.amount, 10) - fee;
    const data = {
      amount: sellerPayment,
      recipient: this.recipientCode,
    };
    this.transactionsService
      .initiateReleasePaystack(data, this.transactionId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        if (response) {
          this.releaseFunds(transactionId);
          this.loadUserTransaction(transactionId);
        }
        return response;
      });
  }

  onSecureFunds() {
    this.isSecuring = true;
    const transactionData = {
      email: this.email,
      amount: this.totalAmount * 100
    };
    this.transactionsService
      .payStackPayment(transactionData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response: any) => {
        // window.location.href = `${response.data.authorization_url}`;
        window.open(
          `${response.data.authorization_url}`,
          'popup',
          'width=500,height=650',
          false
        );
        this.transaction_ref = response.data.reference;
        setTimeout(() => {
          this.checkSuccessSecuredFunds(this.transaction_ref);
        }, 30000);
        return false;
      });
  }

  checkSuccessSecuredFunds(ref) {
    const transaction_key = this.transactionKey;
    this.transactionsService
      .checkTransactionStatus(ref, transaction_key)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((statusData) => {
        if (statusData.data && statusData.data.status === 'success') {
          this.modalService.hide(1);
          this.loadUserTransaction(this.transactionKey);
        } else {
          this.ngOnInit();
        }
      });
  }

  getNoworriFee(price) {
    return (price / 100) * 1.95;
  }

  getTotalAmount(price) {
    const amount  = parseInt(price, 10) + this.getNoworriFee(price);
    return amount;
  }

  getSellerDetails(buyerUid) {
    this.userService.getUserDetailsById(buyerUid)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (user) => {
        if (isEmpty(user)) {
          this.sellerPhone  = 'N/A';
        } else {
          this.sellerPhone = user.mobile_phone;
          this.getPaymentRecipient(user.user_uid);
        }
        return this.sellerPhone;
      },
      (error) => {
        console.log('Error %j', error.message);
      }
    );
}

  getDestinatorDetails(destinator_id) {
      this.companyService.getCompanyDetailsByUid(destinator_id).subscribe(
        (company: CompanyReference) => {
          if (isEmpty(company)) {
            this.getSellerDetails(destinator_id);
          } else {
            this.sellerPhone = company.businessphone;
            this.getPaymentRecipient(company.user_id);
          }
        },
        (error) => {
          console.log('Error %j', error.message);
        }
      );
  }

  loadUserTransaction(transaction_id: string) {
    this.transactionsService
      .getUserTransaction(transaction_id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (transactions) => {
          this.tableData = transactions.map((details) => {
            this.transactionType = details.transaction_type.toLowerCase();
            this.userRole = details.initiator_role.toLowerCase();
            this.amount = details.price;
            this.item = details.name;
            this.description = details.requirement;
            this.transactionId = details.id;
            this.totalAmount = this.getTotalAmount(details.price).toFixed(2);
            this.noworriFee = this.getNoworriFee(details.price).toFixed(2);
            this.hasDeliveryPhone = details.delivery_phone ? true : false;
            this.deliveryPhone = details.delivery_phone ? details.delivery_phone : 'N/A';
            this.getDestinatorDetails(details.destinator_id);
            if (details.etat === '3') {
              this.isFundsReleased = true;
            }
            if (details.etat === '2') {
              this.isFundsSecured = true;
            }
            if (details.etat === '0') {
              this.isCancelled = true;
            }
            if (details.etat === '1') {
              this.isPending = true;
            }

            return details;
          });
        },
        (error) => console.log(error.message)
      );
  }
}
