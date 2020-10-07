import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransactionsService } from 'src/app/Service/transactions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {isEmpty} from 'lodash'; 
import { NoworriSearchService } from 'src/app/Service/noworri-search.service';
import { CompanyReference } from 'src/app/Service/reference-data.interface';
import { AuthserviceService } from 'src/app/Service/authservice.service';

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
  storedTransactionDetails: any;
  amount: any;
  totalAmount: any;
  noworriFee: any;
  transactionType: string;
  userId: string;
  columns: any[];
  mobileWallet = false;
  isValidating = false;
  isFundsReleased = false;
  isCancelled = false;
  hasDeliveryPhone: boolean;
  recipientCode: string;

  sellerPhone: string;
  description: string;
  item: string;
  deliveryPhone: string;
  transactionId: string;

  constructor(
    private transactionsService: TransactionsService,
    private router: Router,
    private route: ActivatedRoute,
    private companyService: NoworriSearchService,
    private userService: AuthserviceService
  ) {
    this.transactionId = this.route.snapshot.paramMap.get('transactionKey');
  }

  ngOnInit() {
    this.loadUserTransaction(this.transactionId);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onReleaseFunds() {
    this.initiateRelease(this.transactionId);
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

  getPaymentRecipient(sellerId) {
    this.transactionsService
      .getAccountDetails(sellerId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((details: any) => {
        this.recipientCode = details[0].recipient_code;
        return this.recipientCode;
      });
  }

  getSellerNoworriFee(price: number) {
    return (price / 100) * 1.98;
  }

  initiateRelease(transactionId) {
    const fee = this.getSellerNoworriFee(this.amount);
    const sellerPayment = fee + parseInt(this.amount, 10);
    const data = {
      amount: sellerPayment,
      recipient: this.recipientCode,
    };
    this.transactionsService
      .initiateReleasePaystack(data)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        if (response) {
          this.releaseFunds(transactionId);
          this.loadUserTransaction(transactionId);
        }
        return response;
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
          this.getPaymentRecipient(this.sellerPhone);
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
            this.getPaymentRecipient(this.sellerPhone);
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
            this.totalAmount = this.getTotalAmount(details.price).toFixed(2);
            this.noworriFee = this.getNoworriFee(details.price).toFixed(2);
            this.hasDeliveryPhone = details.delivery_phone ? true : false;
            this.deliveryPhone = details.delivery_phone ? details.delivery_phone : 'N/A';
            this.getDestinatorDetails(details.destinator_id);
            if (details.etat === '2') {
              this.isFundsReleased = true;
            }
            if (details.etat === '0') {
              this.isCancelled = true;
            }
            return details;
          });
        },
        (error) => console.log(error.message)
      );
  }
}
