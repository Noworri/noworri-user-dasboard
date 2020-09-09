import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransactionsService } from 'src/app/Service/transactions.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TransactionsReference } from 'src/app/Service/reference-data.interface';
import { PaymentService } from 'src/app/Service/payment.service';
import { Router } from '@angular/router';

const SESSION_STORAGE_KEY = 'noworri-user-session';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit, OnDestroy {
  unsubscribe = new Subject();

  tableData: any;
  userRole: string;
  storedTransactionDetails: any;
  amount: any;
  transactionType: string;
  userId: string;
  userPhone: string;
  ownerPhone: string;
  ownerRole: string;
  hasNoTransactions = false;
  columns: any[];
  paymentResponse: any;

  constructor(
    private transactionsService: TransactionsService,
    private router: Router
  ) {
    const sessionData = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY));
    this.userId = sessionData.user_uid;
    this.userPhone = sessionData.mobile_phone;
  }

  ngOnInit() {
    this.loadTransactions(this.userId);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  loadTransactions(userId: string) {
    // userId = 'a9twRK1JpPPQDrB6hNvfAr2ju682' this is a test User_uid
    this.transactionsService
      .getUserTransactions(userId)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (transactions) => {
          this.tableData = transactions;
          transactions.forEach((details) => {
            this.transactionType = details.transaction_type.toLowerCase();
            if (
              details.user_role === 'Sell' &&
              this.userId === details.user_id
            ) {
              details['sellerPhone'] = details.user_phone;
              details['BuyerPhone'] = details.owner_phone;
            } else if (
              details.user_role === 'Buy' &&
              this.userId === details.user_id
            ) {
              details['sellerPhone'] = details.owner_phone;
              details['BuyerPhone'] = details.user_phone;
            } else if (
              details.owner_role === 'Buy' &&
              this.userId === details.owner_id) {
                details['sellerPhone'] = details.user_phone;
                details['BuyerPhone'] = details.owner_phone;
            } else if (
              details.owner_role === 'Sell' &&
              this.userId === details.owner_id) {
                details['sellerPhone'] = details.owner_phone;
                details['BuyerPhone'] = details.user_phone;
            } else {
              details['sellerPhone'] = details.owner_phone;
              details['BuyerPhone'] = details.user_phone;
            }
            this.amount = details.total_price;
          });
          this.hasNoTransactions = transactions.length === 0 ? true : false;
        },
        (error) => console.log(error.message)
      );
  }

  onViewTransactionDetails(
    transactionKey,
    userRole,
    ownerRole,
    userPhone,
    ownerPhone,
    transactionType
  ) {
    transactionType = transactionType.toLowerCase();
    if (this.userPhone === userPhone) {
      this.userRole = userRole;
    } else if (this.userPhone === ownerPhone) {
      this.userRole = ownerRole;
    }

    if (this.userRole === 'Buy' && transactionType === 'merchandise') {
      this.router.navigate([`buyermerchandisecontrat/${transactionKey}`]);
    } else if (this.userRole === 'Sell' && transactionType === 'merchandise') {
      this.router.navigate([`sellermerchandisecontrat/${transactionKey}`]);
    } else if (this.userRole === 'Buy' && transactionType === 'services') {
      this.router.navigate([`buyerservicescontrat/${transactionKey}`]);
    } else if (this.userRole === 'Sell' && transactionType === 'services') {
      this.router.navigate([`sellerservicescontrat/${transactionKey}`]);
    }
  }
}
