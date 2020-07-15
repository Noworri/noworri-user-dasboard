import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransactionsService } from 'src/app/Service/transactions.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TransactionsReference } from 'src/app/Service/reference-data.interface';
import { PaymentService } from 'src/app/Service/payment.service';

const SESSION_STORAGE_KEY = 'noworri-user-session';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit,OnDestroy {
  unsubscribe = new Subject<Object>();
  tableData: any;
  userId: string;
  hasNoTransactions = false;
  columns: any[];
  paymentResponse: any;

  constructor(private transactionsService : TransactionsService, private paymentService: PaymentService) { 
    const sessionData = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY));
    this.userId = sessionData.user_uid;
    // this.columns = {
    //   Transaction ID
    //   Transaction Type
    //   Amount
    //   Noworri Fee
    //   status

    // }
  }

  ngOnInit() {
    console.log('userId', this.userId);
    this.loadTransactions(this.userId);
    this.testPayment();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  loadTransactions(userId: string) {
    userId = 'a9twRK1JpPPQDrB6hNvfAr2ju682'
    this.transactionsService.getUerTranactions(userId).pipe(takeUntil(this.unsubscribe)).subscribe(
      transactions => {
        this.tableData = transactions;
        this.hasNoTransactions = transactions.length === 0 ? true : false; 
      },
      error => console.log(error.message)
    );
  }

  testPayment() {
    const body = {
      "paymentDetails": {
          "requestId": "4466",
          "productCode":"GMT112",
          "amount": "50035",
          "currency": "GBP",
          "locale": "en_AU",
          "orderInfo": "255s353",
          "returnUrl": "https://unifiedcallbacks.com/corporateclbkservice/callback/qr"
      },
      "merchantDetails": {
          "accessCode": "79742570",
          "merchantID": "ETZ001",
          "secureSecret": "sdsffd"
      },
      "secureHash":"7f137705f4caa39dd691e771403430dd23d27aa53cefcb97217927312e77847bca6b8764f487ce5d1f6520fd7227e4d4c470c5d1e7455822c8ee95b10a0e9855"
  };   
      this.transactionsService.processPayment(body).pipe(takeUntil(this.unsubscribe)).subscribe(
      response => {
        this.paymentResponse = response
        console.log(response);
        return this.paymentResponse;
      },
      error => console.log(error.message)
    );
  }

}
