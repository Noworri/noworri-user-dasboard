import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionsService } from 'src/app/Service/transactions.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-seller-merchandise-contrat',
  templateUrl: './seller-merchandise-contrat.component.html',
  styleUrls: ['./seller-merchandise-contrat.component.scss']
})
export class SellerMerchandiseContratComponent implements OnInit, OnDestroy {
  unsubscribe = new Subject();

  tableData: any;
  userRole: string;
  storedTransactionDetails: any;
  amount: any;
  noworriFee: any;
  totalAmount: any;
  transactionType: string;
  userId: string;
  columns: any[];

  buyerPhone: string;
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

  getNoworriFee(price: number) {
    return ((price / 100) * 1.98);
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
            this.userRole = details.owner_role.toLowerCase();
            this.amount = parseInt(details.price, 10).toFixed(2);
            this.noworriFee = this.getNoworriFee(this.amount).toFixed(2);
            this.totalAmount = parseInt(this.amount, 10) - parseInt(this.noworriFee, 10);
            this.totalAmount = this.totalAmount.toFixed(2);
            this.item = details.service;
            this.buyerPhone = details.user_phone;
            this.description = details.requirement;
          });
        },
        (error) => console.log(error.message)
      );
  }
}
