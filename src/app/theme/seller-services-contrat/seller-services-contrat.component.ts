import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { TransactionsService } from 'src/app/Service/transactions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/Service/auth.service';

const SESSION_STORAGE_KEY = 'noworri-user-session';

@Component({
  selector: 'app-seller-services-contrat',
  templateUrl: './seller-services-contrat.component.html',
  styleUrls: ['./seller-services-contrat.component.scss'],
})
export class SellerServicesContratComponent implements OnInit, OnDestroy {
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
  deadline: string;
  revisions: string;
  isValidating = false;
  isAgreeing = false;
  isUpdating = false;
  isFundsReleased = false;
  isCancelled = false;
  isUpdatingDelivery = false;
  hasAgreed = false;
  hasSecuredFunds = false;
  hasStartedService = false;
  isUserSeller = false;
  isSubmitting = false;
  hasCancelled = false;
  creationDate: string;
  creationTime: string;
  updateDate: string;
  updateTime: string;
  buyer: string;
  stepDetails: object;
  startedDate: string;
  startedTime: string;
  securedDate: string;
  securedTime: string;
  agreedDate: string;
  agreedTime: string;
  deliveredDate: string;
  deliveredTime: string;
  demoDate: string;
  demoTime: string;
  revisionDate: string;
  revisionTime: string;
  hasSentDemo = false;
  hasRevisions = false;
  hasDelivered = false;
  hasSentRevisions = false;
  countDownStart: string;
  countDownStop: string;
  uploadedFiles: any;
  stepUploadedFiles = [];
  files: any;
  revisionFiles: any;
  filePaths = [];
  stepDescription: string;
  paymentCountDown: any;
  revisionDescription: string;
  hasRevisionsRequested = false;
  cancelDate: string;
  cancelTime: string;

  buyerPhone: string;
  description: string;
  item: string;
  deliveryPhone: string;
  transactionKey: string;
  transactionId: string;
  isCollapsed = false;
  message1 = 'Hide';
  message2 = 'keyboard_arrow_down';
  message3 = 'Hide';
  message4 = 'keyboard_arrow_down';
  currency: string;

  ShowOrNotOpenNoteInput: boolean;
  constructor(
    private transactionsService: TransactionsService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: AuthService
  ) {
    this.transactionKey = this.route.snapshot.paramMap.get('transactionKey');
    this.updateDate = '';
    this.updateTime = '';
    const sessionData = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY));
    this.userId = sessionData.user_uid;
    if (sessionData.mobile_phone.includes('233')) {
      this.currency = 'GHS';
    } else {
      this.currency = 'NGN';
    }
  }

  ngOnInit() {
    this.loadUserTransaction(this.transactionKey);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getNoworriFee(price: number) {
    return (price / 100) * 1.98;
  }

  approveService() {
    this.isAgreeing = true;
    this.stepDetails = {
      transaction_id: this.transactionKey,
      step: 1,
      description: '',
    };
    this.setStepTransaction(this.stepDetails);
    this.isAgreeing = false;
    this.getStepTransaction();
  }

  setStepTransaction(stepDetails) {
    this.isValidating = true;
    this.transactionsService
      .setStepTransaction(stepDetails)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (response) => {
          this.isValidating = false;
          this.getStepTransaction();
          return response;
        },
        (error) => {
          this.isValidating = false;
          console.log(error);
          // this.router.navigate(['transactions']);
        }
      );
  }

  onOpenAttachedFile(path) {
    const url = `https://noworri.com/api/public/uploads/trs/upf/${path}`;
    window.open(url, 'popup', 'width=500,height=600');
    return false;
  }

  getUploadedFiles() {
    this.transactionsService
      .getTransactionUploads(this.transactionId)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((uploads: any) => {
        this.uploadedFiles = uploads.map((file) => {
          return file.path;
        });
      });
  }

  getStepTransaction() {
    this.transactionsService
      .getStepTransDetails(this.transactionKey)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (stepDetails: any) => {
          stepDetails.forEach((details) => {
            if (details.step === '7') {
              this.updateDate = new Date(details.updated_at).toDateString();
              this.updateTime = new Date(
                details.updated_at
              ).toLocaleTimeString();
              this.isFundsReleased = true;
              this.hasSecuredFunds = true;
              this.hasAgreed = true;
            }
            if (details.step === '1') {
              this.agreedDate = new Date(details.updated_at).toDateString();
              this.agreedTime = new Date(
                details.updated_at
              ).toLocaleTimeString();
              this.hasAgreed = true;
            }
            if (details.step === '2') {
              this.securedDate = new Date(details.updated_at).toDateString();
              this.securedTime = new Date(
                details.updated_at
              ).toLocaleTimeString();
              this.hasSecuredFunds = true;
              this.hasAgreed = true;
              this.countDownStart = details.updated_at;
              this.countDownStop = this.deadline;
            }
            if (details.step === '5') {
              this.startedDate = new Date(details.updated_at).toDateString();
              this.startedTime = new Date(
                details.updated_at
              ).toLocaleTimeString();
              this.hasStartedService = true;
              this.hasAgreed = true;
              this.hasSecuredFunds = true;
            }
            if (details.step === '6') {
              this.demoDate = new Date(details.updated_at).toDateString();
              this.demoTime = new Date(details.updated_at).toLocaleTimeString();
              this.hasStartedService = true;
              this.hasAgreed = true;
              this.hasSentDemo = true;
              this.hasSecuredFunds = true;
              const paymentCountDownDate = new Date(details.updated_at);
              paymentCountDownDate.setHours(
                paymentCountDownDate.getHours() + 24
              );
              this.paymentCountDown = paymentCountDownDate;
            }

            if (details.step === '8') {
              this.deliveredDate = new Date(details.updated_at).toDateString();
              this.deliveredTime = new Date(
                details.updated_at
              ).toLocaleTimeString();
              this.hasStartedService = true;
              this.hasAgreed = true;
              this.hasSentDemo = true;
              this.hasDelivered = true;
              this.isFundsReleased = true;
              this.hasSecuredFunds = true;
            }
            if (details.step === '9') {
              this.revisionDate = new Date(details.updated_at).toDateString();
              this.revisionTime = new Date(
                details.updated_at
              ).toLocaleTimeString();
              this.hasStartedService = true;
              this.hasSecuredFunds = true;
              this.hasAgreed = true;
              this.hasSentDemo = true;
              this.hasRevisions = true;
              this.revisionDescription = details.description;
              this.hasRevisionsRequested = true;
            }
            if (details.step === '10') {
              this.revisionDate = new Date(details.updated_at).toDateString();
              this.revisionTime = new Date(
                details.updated_at
              ).toLocaleTimeString();
              this.hasStartedService = true;
              this.hasSecuredFunds = true;
              this.hasAgreed = true;
              this.hasSentDemo = true;
              this.hasRevisions = true;
              this.hasSentRevisions = true;
              // this.revisionDescription = details.description;
            }
            if (details.step === '0') {
              this.cancelDate = new Date(details.updated_at).toDateString();
              this.cancelTime = new Date(
                details.updated_at
              ).toLocaleTimeString();
              this.hasStartedService = true;
              this.hasAgreed = true;
              this.hasSentDemo = false;
              this.hasDelivered = false;
              this.isFundsReleased = false;
              this.hasCancelled = true;
            }
          });
        },
        (error) => {
          this.isValidating = false;
          console.log(error);
        }
      );
  }

  onCancelService() {
    this.transactionsService
      .cancelOrder(this.transactionKey)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response) => {
        const stepDetails = {
          transaction_id: this.transactionKey,
          step: 0,
          description: 'Service Cancelled',
        };
        this.setStepTransaction(stepDetails);
        return response;
      });
  }

  cancelOrder() {
    this.isValidating = true;
    this.transactionsService
      .cancelOrder(this.transactionKey)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (response) => {
          setTimeout(() => {
            this.isValidating = false;
            this.router.navigate(['transactions']);
          }, 2000);
          return response;
        },
        (error) => {
          this.isValidating = false;
          console.log(error);
        }
      );
  }

  onStartService() {
    this.isValidating = true;
    setTimeout(() => {
      this.isValidating = false;
      this.stepDetails = {
        transaction_id: this.transactionKey,
        step: 5,
        description: '',
      };
      this.setStepTransaction(this.stepDetails);
      this.getStepTransaction();
    }, 2000);
  }

  getBuyerDetails(buyerPhone) {
    this.userService.getUserDetails(buyerPhone).subscribe(
      (user) => {
        this.buyer = user.first_name;
      },
      (error) => {
        console.log('Error %j', error.message);
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
            this.userRole = details.owner_role.toLowerCase();
            this.amount = parseInt(details.price, 10).toFixed(2);
            this.noworriFee = this.getNoworriFee(this.amount).toFixed(2);
            this.totalAmount =
              parseInt(this.amount, 10) - parseInt(this.noworriFee, 10);
            this.totalAmount = this.totalAmount.toFixed(2);
            this.item = details.service;
            this.revisions = details.revision;
            this.deadline = details.deadline;
            this.creationDate = new Date(details.created_at).toDateString();
            this.creationTime = new Date(
              details.created_at
            ).toLocaleTimeString();
            if (
              details.user_id === this.userId &&
              details.user_role === 'Sell'
            ) {
              this.isUserSeller = true;
            }
            if (
              details.user_id === this.userId &&
              details.user_role === 'Sell'
            ) {
              this.buyerPhone = details.owner_phone;
            } else if (
              details.owner_id === this.userId &&
              details.owner_role === 'Sell'
            ) {
              this.buyerPhone = details.user_phone;
            }
            this.getBuyerDetails(this.buyerPhone);
            this.description = details.requirement;
            this.transactionId = details.id;
            this.deliveryPhone = details.deadline_type
              ? details.deadline_type
              : 'N/A';
            if (details.etat === '4') {
              this.isFundsReleased = true;
              this.hasSecuredFunds = true;
              this.hasAgreed = true;
            }
            if (details.etat === '0') {
              this.isCancelled = true;
            }
            // if (details.etat === '3') {
            //   this.hasAgreed = true;
            // }
            // if (details.etat === '4') {
            //   this.hasSecuredFunds = true;
            //   this.hasAgreed = true;
            // }
            // if (details.etat === '5') {
            //   this.hasStartedService = true;
            // }
            this.getUploadedFiles();
            this.getStepTransaction();
          });
        },
        (error) => console.log(error.message)
      );
  }

  upload(files: FileList) {
    this.files = files;
    this.revisionFiles = files;
    for (let i = 0; i < files.length; i++) {
      this.stepUploadedFiles.push(files[i].name);
    }
  }

  onDeliverService(form) {
    this.stepDescription = form.value['editor'];

    this.isSubmitting = true;
    if (this.files) {
      for (const file of Array.from(this.files)) {
        this.uploadFile(file);
      }
    }
    this.isValidating = false;
    this.stepDetails = {
      transaction_id: this.transactionKey,
      step: 6,
      description: this.stepDescription,
    };
    this.setStepTransaction(this.stepDetails);
    this.getStepTransaction();
  }

  onSubmitRevision(form) {
    this.stepDescription = form.value['editor'];

    this.isSubmitting = true;
    if (this.revisionFiles) {
      for (const file of Array.from(this.revisionFiles)) {
        this.uploadRevisionFile(file);
      }
    }
    this.isValidating = false;
    this.stepDetails = {
      transaction_id: this.transactionKey,
      step: 10,
      description: this.stepDescription,
    };
    this.setStepTransaction(this.stepDetails);
    this.getStepTransaction();
    this.hasSentRevisions = true;
    this.ShowOrNotOpenNoteInput = false;
  }

  mapUploadedFiles(transactionKey, filePaths) {
    this.transactionsService
      .mapUploadedFiles(transactionKey, filePaths)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response) => {
        return response;
      });
  }

  uploadFile(file) {
    this.transactionsService.uploadFile(file).subscribe(
      (response: any) => {
        this.isSubmitting = false;
        if (response.path) {
          this.filePaths.push(response.path);
          this.mapUploadedFiles(this.transactionKey, this.filePaths);
        }
      },
      (error) => {
        this.isSubmitting = false;
        console.log('Error %j', error.message);
      }
    );
  }

  uploadRevisionFile(file) {
    this.transactionsService.uploadFile(file).subscribe(
      (response: any) => {
        this.isSubmitting = false;
        if (response.path) {
          this.filePaths.push(response.path);
          const newKey = `${this.transactionKey}${this.transactionId}`;
          this.mapUploadedFiles(newKey, this.filePaths);
        }
      },
      (error) => {
        this.isSubmitting = false;
        console.log('Error %j', error.message);
      }
    );
  }

  collapses(): void {
    this.message2 = 'keyboard_arrow_down';
    this.message1 = 'Show';
  }

  expanded(): void {
    this.message2 = 'keyboard_arrow_up';
    this.message1 = 'Hide';
  }
  collapsess(): void {
    this.message3 = 'Show';
    this.message4 = 'keyboard_arrow_down';
  }
  expandeds(): void {
    this.message3 = 'Hide';
    this.message4 = 'keyboard_arrow_up';
  }

  OpenNoteInput() {
    this.ShowOrNotOpenNoteInput =
      this.ShowOrNotOpenNoteInput === true ? false : true;
  }
}
