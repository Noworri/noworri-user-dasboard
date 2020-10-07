import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionsService } from 'src/app/Service/transactions.service';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { NoworriSearchService } from 'src/app/Service/noworri-search.service';
import { isEmpty } from 'lodash';
import { AuthserviceService } from 'src/app/Service/authservice.service';

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


  buyerPhone: string;
  description: string;
  item: string;
  deliveryPhone: string;
  transactionKey: string;
  transactionId: string;

  constructor(
    private transactionsService: TransactionsService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: AuthserviceService
  ) {
    this.transactionKey = this.route.snapshot.paramMap.get('transactionKey');
    const sessionData = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY));
    this.userId = sessionData.user_uid;
  }

  ngOnInit() {
    this.loadUserTransaction(this.transactionKey);
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
          this.router.navigate(['transactions']);
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
    const newDelivery = `+233${form.value['newDelivery']}`;
    this.transactionsService.updateDeliveryPhone(this.transactionId, newDelivery).pipe(takeUntil(this.unsubscribe$)).subscribe(
      response => {
        setTimeout(() => {
          this.isUpdating = false;
          this.router.navigate(['transactions']);
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
            if (details.etat === '2') {
              this.isFundsReleased = true;
            }
            if (details.etat === '0') {
              this.isCancelled = true;
            }
          });
        },
        (error) => console.log(error.message)
      );
  }
}
