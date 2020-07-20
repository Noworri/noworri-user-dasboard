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
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnDestroy {
  unsubscribe = new Subject();

  tableData: any;
  userRole: string;
  storedTransactionDetails: any;
  amount: any;
  transactionType: string;
  userId: string;
  hasNoTransactions = false;
  columns: any[];
  paymentResponse: any;

  constructor(private transactionsService: TransactionsService, private router: Router
    ) {
    const sessionData = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY));
    this.userId = sessionData.user_uid;
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
    this.transactionsService.getUserTranactions(userId).pipe(takeUntil(this.unsubscribe)).subscribe(
      transactions => {
        this.tableData = transactions;
        transactions.forEach(details => {
          this.transactionType = details.transaction_type.toLowerCase();
          if (userId === details.owner_id) {
            this.userRole = 'sell';
          } else if (userId === details.user_id) {
            this.userRole = 'buy';
          }
          this.amount = details.total_price;
        });
        this.hasNoTransactions = transactions.length === 0 ? true : false;
      },
      error => console.log(error.message)
    );
  }

  onViewTransactionDetails(transactionKey) {
    if (this.userRole === 'buy' && this.transactionType === 'merchandise') {
      this.router.navigate([`buyermerchandisecontrat/${transactionKey}`]);
    } else if (this.userRole === 'sell' && this.transactionType === 'merchandise') {
      this.router.navigate([`sellermerchandisecontrat/${transactionKey}`]);
    } else if (this.userRole === 'buy' && this.transactionType === 'service') {
      this.router.navigate([`buyerservicescontrat/${transactionKey}`]);
    } else if (this.userRole === 'sell' && this.transactionType === 'service') {
      this.router.navigate([`sellerservicescontrat/${transactionKey}`]);
    }

  }

}
