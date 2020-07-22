import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransactionsService } from 'src/app/Service/transactions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-buyer-merchandise-contrat',
  templateUrl: './buyer-merchandise-contrat.component.html',
  styleUrls: ['./buyer-merchandise-contrat.component.scss'],
})
export class BuyerMerchandiseContratComponent implements OnInit, OnDestroy {
  unsubscribe = new Subject();

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

  sellerPhone: string;
  description: string;
  item: string;
  deliveryPhone: string;
  transactionId: string;

  constructor(
    private transactionsService: TransactionsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.transactionId = this.route.snapshot.paramMap.get('transactionKey');
  }

  ngOnInit() {
    this.loadUserTransaction(this.transactionId);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onReleaseFunds() {
    this.releaseFunds(this.transactionId);
  }

  releaseFunds(transaction_id) {
    this.isValidating = true;
    this.transactionsService.releaseFunds(transaction_id).pipe(takeUntil(this.unsubscribe)).subscribe(
      response => {
        setTimeout(() => {
          this.isValidating = false;
          this.router.navigate(['transactions']);
        }, 5000);
        return response;
      }
    );
  }

  loadUserTransaction(transaction_id: string) {
    this.transactionsService
      .getUserTransaction(transaction_id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (transactions) => {
          this.tableData = transactions;
          transactions.forEach((details) => {
            this.transactionType = details.transaction_type.toLowerCase();
            this.userRole = details.user_role.toLowerCase();
            this.amount = details.price;
            this.item = details.service;
            this.sellerPhone = details.owner_phone;
            this.description = details.requirement;
            this.totalAmount = details.total_price;
            this.noworriFee = details.noworri_fees;
            if (details.etat === '1') {
              this.isFundsReleased = true;
            }
            if (details.etat === '2') {
              this.isCancelled = true;
            }
          });
        },
        (error) => console.log(error.message)
      );
  }
}
