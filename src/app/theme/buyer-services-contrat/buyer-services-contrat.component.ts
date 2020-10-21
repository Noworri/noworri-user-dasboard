import { AuthserviceService } from './../../Service/authservice.service';
import { AuthService } from './../../core/auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { TransactionsService } from 'src/app/Service/transactions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { isEmpty } from 'lodash';
import { NoworriSearchService } from 'src/app/Service/noworri-search.service';
import { TrustedString } from '@angular/core/src/sanitization/bypass';

const SESSION_STORAGE_KEY = 'noworri-user-session';

@Component({
  selector: 'app-buyer-services-contrat',
  templateUrl: './buyer-services-contrat.component.html',
  styleUrls: ['./buyer-services-contrat.component.scss'],
})
export class BuyerServicesContratComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  message1 = 'Hide';
  message2 = 'keyboard_arrow_down';
  message3 = 'Hide';
  message4 = 'keyboard_arrow_down';

  unsubscribe = new Subject();

  tableData: any;
  userEmail: string;
  stepDetails: object;
  userRole: string;
  storedTransactionDetails: any;
  amount: any;
  totalAmount: any;
  noworriFee: any;
  transactionType: string;
  userId: string;
  columns: any[];
  ownerId: string;
  revisionResutDescription = '';
  isRegisteredBusiness = true;
  hasCancelled = false;
  mobileWallet = false;
  isValidating = false;
  isFundsReleased = false;
  hasUploadedFiles = true;
  isCancelled = false;
  hasAgreed = false;
  hasDelivered = false;
  hasSentDemo = false;
  hasRevisions = false;
  isUserBuyer = false;
  hasRevisionResult = false;
  hasDeliveryPhone: boolean;
  creationDate: string;
  creationTime: string;
  updateDate: string;
  updateTime: string;
  hasStartedService = false;
  isSecuring = false;
  startedDate: string;
  startedTime: string;
  securedDate: string;
  securedTime: string;
  agreedDate: string;
  agreedTime: string;
  demoDate: string;
  demoTime: string;
  deliveredTime: string;
  deliveredDate: string;
  revisionDate: string;
  revisionTime: string;
  revisionResultDate: string;
  revisionResultTime: string;
  stepDescription: string;
  stepDeliveryDescription: string;
  businessName: string;
  countDownStop: string;
  uploadedFiles: any;
  workUploadedFiles: any;
  revisionUploadedFiles: any;
  hasRequestedRevision = false;
  newDeadline: any;
  recipientCode: string;
  revisionDescription: string;
  cancelDate: string;
  cancelTime: string;
  todaysDate: Date;

  sellerPhone: string;
  description: string;
  item: string;
  deliveryPhone: string;
  transactionKey: string;
  transactionId: string;
  deadline: string;
  revisions: string;
  seller: string;
  hasSecuredFunds = false;
  ShowOrNotOpenNoteInput = false;
  showRevisionInput = false;
  isSubmitting = false;
  paymentCountDown: any;
  isApproving = false;
  hasRevisionsLeft = true;
  revisionsLeft: number;
  hasNewRevision = false;
  transaction_ref: string;
  recipientDetails: object;
  accountNo: string;
  holderName: string;
  bankCode: string;
  currency: string;
  country: string;

  constructor(
    private transactionsService: TransactionsService,
    private router: Router,
    private route: ActivatedRoute,
    private companyService: NoworriSearchService,
    private userService: AuthserviceService
  ) {
    this.todaysDate = new Date();
    this.transactionKey = this.route.snapshot.paramMap.get('transactionKey');
    this.updateDate = '';
    this.updateTime = '';
    const sessionData = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY));
    this.userId = sessionData.user_uid;
    this.userEmail = sessionData.email;
    if (sessionData.mobile_phone.startsWith('+233')) {
      this.currency = 'GHS';
      this.country = 'Ghana';
    } else {
      this.currency = 'NGN';
      this.country = 'Nigeria';
    }
  }
  ngOnInit() {
    this.loadUserTransaction(this.transactionKey);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  approveContract() {
    this.isApproving = true;
    this.stepDetails = {
      transaction_id: this.transactionKey,
      step: 1,
      description: '',
    };
    this.setStepTransaction(this.stepDetails);
    this.isApproving = false;
    this.getStepTransaction();
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

  onReleaseFunds() {
    this.isValidating = true;
    this.releaseFunds(this.transactionKey);
  }

  getSellerCompanyDetails(sellerPhoneNumber) {
    this.companyService.getCompanyDetails(sellerPhoneNumber).subscribe(
      (user) => {
        if (isEmpty(user)) {
          this.isRegisteredBusiness = false;
          this.businessName = this.sellerPhone;
        } else {
          this.businessName = user.businessname;
        }
      },
      (error) => {
        console.log('Error %j', error.message);
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
        if (uploads.length) {
          this.uploadedFiles = uploads.map((file) => {
            return file.path;
          });
        } else {
          this.hasUploadedFiles = false;
        }
      });
  }

  getWorkFiles() {
    this.transactionsService
      .getTransactionUploads(this.transactionKey)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((uploads: any) => {
        this.workUploadedFiles = uploads.map((file) => {
          return file.path;
        });
      });
  }

  getRevisionFiles() {
    const newKey = `${this.transactionKey}${this.transactionId}`;
    this.transactionsService
      .getTransactionUploads(newKey)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((uploads: any) => {
        this.revisionUploadedFiles = uploads.map((file) => {
          return file.path;
        });
      });
  }

  getSellerDetails(sellerPhoneNumber) {
    this.userService.getUserDetails(sellerPhoneNumber).subscribe(
      (user) => {
        this.seller = user.first_name;
      },
      (error) => {
        console.log('Error %j', error.message);
      }
    );
  }

  getPaymentRecipient(sellerId) {
    this.transactionsService
      .getAccountDetails(sellerId)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((details: any) => {
        this.recipientCode = details[0].recipient_code;
        return this.recipientCode;
      });
  }

  getSellerNoworriFee(price: number) {
    return (price / 100) * 1.98;
  }

  releaseFunds(transaction_id) {
    this.initiateRelease(transaction_id);
  }

  initiateRelease(transactionId) {
    const fee = this.getSellerNoworriFee(this.amount);
    const sellerPayment = fee + parseInt(this.amount, 10);
    const data = {
      amount: sellerPayment,
      recipient: this.recipientCode,
    };
    this.transactionsService
      .initiateReleasePaystack(data, this.transactionId)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response) => {
        if (response) {
          this.markFundsReleased(transactionId);
          this.getStepTransaction();
        }
        return response;
      });
  }

  markFundsReleased(transaction_id) {
    this.isValidating = true;
    this.transactionsService
      .releaseFunds(transaction_id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response) => {
        this.isValidating = false;
        this.stepDetails = {
          transaction_id: this.transactionKey,
          step: 8,
          description: '',
        };
        this.setStepTransaction(this.stepDetails);
        return response;
      });
  }

  setStepTransaction(stepDetails) {
    this.isValidating = true;
    this.transactionsService
      .setStepTransaction(stepDetails)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (response) => {
          setTimeout(() => {
            this.isValidating = false;
            this.getStepTransaction();
          }, 5000);
          return response;
        },
        (error) => {
          this.isValidating = false;
          console.log(error);
          // this.router.navigate(['transactions']);
        }
      );
  }

  // onCardPay() {
  //   this.isValidating = true;

  //   const amount = `${this.amount}`;
  //   const body = {
  //     paymentDetails: {
  //       requestId: '4466',
  //       productCode: 'GMT112',
  //       amount: amount,
  //       currency: 'GBP',
  //       locale: 'en_AU',
  //       orderInfo: '255s353',
  //       returnUrl: 'https://web.noworri/transactions',
  //     },
  //     merchantDetails: {
  //       accessCode: '79742570',
  //       merchantID: 'ETZ001',
  //       secureSecret: 'sdsffd',
  //     },
  //     secureHash:
  //       '7f137705f4caa39dd691e771403430dd23d27aa53cefcb97217927312e77847bca6b8764f487ce5d1f6520fd7227e4d4c470c5d1e7455822c8ee95b10a0e9855',
  //   };
  //   const newBody = JSON.stringify(body);
  //   this.transactionsService
  //     .processPayment(body)
  //     .pipe(takeUntil(this.unsubscribe))
  //     .subscribe(
  //       (response) => {
  //         this.isValidating = false;
  //         if (
  //           response.response_message &&
  //           response.response_message === 'success'
  //         ) {
  //           // this.onSecureFunds(this.transactionKey);
  //           this.stepDetails = {
  //             transaction_id: this.transactionKey,
  //             step: 2,
  //             description: '',
  //           };
  //           this.setStepTransaction(this.stepDetails);
  //           window.location.href = `${response.response_content}`;
  //         }
  //         return response;
  //       },
  //       (error) => {
  //         this.isValidating = false;
  //         console.log(error.message);
  //       }
  //     );
  // }

  getNoworriFee(price) {
    return (price / 100) * 1.95;
  }

  getTotalAmount(price) {
    const amount = parseInt(price, 10) + this.getNoworriFee(price);
    return amount;
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
            this.description = details.requirement;
            this.totalAmount = this.getTotalAmount(details.price).toFixed(2);
            this.noworriFee = this.getNoworriFee(details.price).toFixed(2);
            this.hasDeliveryPhone = details.deadline_type ? true : false;
            this.deliveryPhone = details.deadline_type
              ? details.deadline_type
              : 'N/A';
            this.transactionId = details.id;
            this.deadline = details.deadline;
            this.revisions = details.revision;
            if (
              details.owner_id === this.userId &&
              details.owner_role === 'Buy'
            ) {
              this.isUserBuyer = true;
              this.ownerId = details.owner_id;
            }
            if (
              details.owner_id === this.userId &&
              details.owner_role === 'Buy'
            ) {
              this.sellerPhone = details.user_phone;
            } else if (
              details.user_id === this.userId &&
              details.user_role === 'Buy'
            ) {
              this.sellerPhone = details.owner_phone;
              this.ownerId = details.owner_id;
            }
            // this.getSellerDetails(this.sellerPhone);
            this.getSellerCompanyDetails(this.sellerPhone);
            this.getPaymentRecipient(this.ownerId);
            this.getUploadedFiles();
            this.creationDate = new Date(details.created_at).toDateString();
            this.creationTime = new Date(
              details.created_at
            ).toLocaleTimeString();
            if (details.etat === '0') {
              this.isCancelled = true;
            }
            if (details.etat === '3') {
              this.hasAgreed = true;
            }
            if (details.etat === '4') {
              this.hasSecuredFunds = true;
              this.hasAgreed = true;
              if (parseInt(this.revisions) > 0) {
                this.hasRevisions = true;
              }
            }
            if (details.etat === '5') {
              this.hasSecuredFunds = true;
              this.hasAgreed = true;
              this.hasStartedService = true;
            }
            this.revisionsLeft = parseInt(this.revisions, 10);
            this.getStepTransaction();
            if (
              !this.hasRevisions &&
              this.paymentCountDown &&
              this.todaysDate >= this.paymentCountDown &&
              !this.isFundsReleased
            ) {
              this.releaseFunds(this.transactionKey);
            }
          });
        },
        (error) => console.log(error.message)
      );
  }

  getStepTransaction() {
    this.transactionsService
      .getStepTransDetails(this.transactionKey)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (stepDetails: any) => {
          stepDetails.forEach((details) => {
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
              this.countDownStop = this.deadline;
            }
            if (details.step === '5') {
              this.startedDate = new Date(details.updated_at).toDateString();
              this.startedTime = new Date(
                details.updated_at
              ).toLocaleTimeString();
              this.hasStartedService = true;
              this.hasAgreed = true;
            }
            if (details.step === '6') {
              this.demoDate = new Date(details.updated_at).toDateString();
              this.demoTime = new Date(details.updated_at).toLocaleTimeString();
              this.hasStartedService = true;
              this.hasAgreed = true;
              this.hasSentDemo = true;
              const paymentCountDownDate = new Date(details.updated_at);
              paymentCountDownDate.setHours(
                paymentCountDownDate.getHours() + 24
              );
              this.paymentCountDown = paymentCountDownDate;
              this.stepDeliveryDescription = details.description;
              this.getWorkFiles();
              this.getRevisionFiles();
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
            }
            if (details.step === '9') {
              this.revisionDate = new Date(details.updated_at).toDateString();
              this.revisionTime = new Date(
                details.updated_at
              ).toLocaleTimeString();
              this.hasStartedService = true;
              this.hasAgreed = true;
              this.hasSentDemo = true;
              this.hasRevisions = true;
              this.revisionsLeft = details.accepted;
              this.countDownStop = this.deadline;
              this.hasRequestedRevision = true;
              this.revisionDescription = details.description;
            }
            if (details.step === '10') {
              this.revisionResultDate = new Date(
                details.updated_at
              ).toDateString();
              this.revisionResultTime = new Date(
                details.updated_at
              ).toLocaleTimeString();
              this.hasStartedService = true;
              this.hasAgreed = true;
              this.hasSentDemo = true;
              this.hasRevisions = true;
              this.hasRevisionResult = true;
              this.hasNewRevision = true;
              const paymentCountDownDate = new Date(details.updated_at);
              paymentCountDownDate.setHours(
                paymentCountDownDate.getHours() + 24
              );
              this.paymentCountDown = paymentCountDownDate;
              this.revisionResutDescription = details.description;
            }
            if (
              !this.hasRevisions &&
              this.paymentCountDown &&
              this.todaysDate >= this.paymentCountDown &&
              !this.isFundsReleased
            ) {
              this.releaseFunds(this.transactionKey);
            }
            if (this.revisionsLeft <= 0) {
              this.hasRevisionsLeft = false;
            }
            this.ShowOrNotOpenNoteInput = false;
            this.showRevisionInput = false;
          });
        },
        (error) => {
          this.isValidating = false;
          console.log(error);
        }
      );
  }

  onSecureFunds() {
    this.isSecuring = true;
    const transactionData = {
      email: this.userEmail,
      amount: parseInt(this.totalAmount) * 100,
    };
    this.transactionsService
      .payStackPayment(transactionData)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response: any) => {
        window.open(
          `${response.data.authorization_url}`,
          'popup',
          'width=500,height=650'
        );
        this.transaction_ref = response.data.reference;
        // this.setStepTransaction(this.stepDetails);
        // setTimeout(() => {
        //   this.markSecuredFunds();
        //   this.isValidating = false;
        //   this.getStepTransaction();
        // }, 25000);
        setTimeout(() => {
          this.checkSuccessSecuredFunds(this.transaction_ref);
        }, 30000);
        return false;
      });
  }

  markSecuredFunds() {
    this.transactionsService
      .markSecuredFunds(this.transactionKey)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((secureResponse) => {
        return secureResponse;
      });
  }

  checkSuccessSecuredFunds(ref) {
    this.transactionsService
      .checkTransactionStatus(ref, this.transactionKey)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((statusData) => {
        if (statusData.data && statusData.data.status === 'success') {
          this.stepDetails = {
            transaction_id: this.transactionKey,
            step: 2,
            description: '',
          };
          this.markSecuredFunds();
          this.setStepTransaction(this.stepDetails);
          this.getStepTransaction();
          this.isSecuring = false;
        }
      });
  }

  openEditor() {
    this.ShowOrNotOpenNoteInput =
      this.ShowOrNotOpenNoteInput === true ? false : true;
  }

  onOpenRevisionEditor() {
    this.showRevisionInput = this.showRevisionInput === true ? false : true;
  }

  onSendRevision(form) {
    if (form) {
      this.isSubmitting = true;
      this.stepDescription = form.value['editor'];
      this.newDeadline = new Date(form.value['deadline'])
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');
      const deadlineData = {
        transaction_id: this.transactionKey,
        new_deadline: this.newDeadline,
      };
      let revisionsLeft = parseInt(this.revisions) - 1;
      if (this.revisionsLeft) {
        revisionsLeft = this.revisionsLeft - 1;
      }

      this.isSubmitting = true;
      // if (this.files) {
      //   for (const file of Array.from(this.files)) {
      //     this.uploadFile(file);
      //   }
      // }
      this.stepDetails = {
        transaction_id: this.transactionKey,
        step: 9,
        description: this.stepDescription,
        accepted: revisionsLeft,
      };
      this.updateDeadline(deadlineData);
      this.hasRequestedRevision = true;
      this.isSubmitting = false;
      this.getStepTransaction();
    }
  }

  updateDeadline(data) {
    return this.transactionsService
      .updateDeadline(data)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response) => {
        this.setStepTransaction(this.stepDetails);
        return response;
      });
  }

  onNoworriSearch(WarningModal, ResultModal) {
    ResultModal.show();
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
}
