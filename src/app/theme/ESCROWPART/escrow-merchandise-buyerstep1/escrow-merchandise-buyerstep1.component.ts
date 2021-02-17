import { template } from "@angular/core/src/render3";
import {
  Component,
  OnInit,
  OnDestroy,
  TemplateRef,
  Sanitizer,
} from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, NgForm } from "@angular/forms";
import {
  MerchandiseEscrowStep1Reference,
  CompanyReference,
} from "src/app/Service/reference-data.interface";
import { NoworriSearchService } from "src/app/Service/noworri-search.service";
import { isEmpty } from "lodash";
import { GeoLocationService } from "./../../../Service/geo-location.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { TransactionsService } from "src/app/Service/transactions.service";
import { AuthserviceService } from "src/app/Service/authservice.service";
import { DomSanitizer } from "@angular/platform-browser";

const SESSION_STORAGE_KEY = "noworri-user-session";
const LOCAL_STORAGE_KEY = "merchandise-escrow-1";

@Component({
  selector: "app-escrow-merchandise-buyerstep1",
  templateUrl: "./escrow-merchandise-buyerstep1.component.html",
  styleUrls: ["./escrow-merchandise-buyerstep1.component.scss"],
})
export class EscrowMerchandiseBuyerstep1Component implements OnInit, OnDestroy {
  unsubscribe$ = new Subject();

  addBankAccountconfig = {
    class: "AddBankaccountCss",
  };

  modalRef: BsModalRef;
  isValidSeller = true;
  rawSeller: string;
  isValidNumber = true;
  isValidating = false;
  isSecuring = false;
  orderDetails: any;
  noworriFee: number;
  totalAmount: number;
  destinator_id: string;
  price: number;
  escrowStep1Data: MerchandiseEscrowStep1Reference;
  prefixCountryCode: string;
  rawDeliveryPhoneNumber: string;
  waitingDisplayInput: boolean;

  // ------- fror recap Modale----- //

  item: any;
  sellerPhoneNumber: any;
  deliveryPhoneNumber: any;

  transactionSummary: object;

  inputValidation: RegExp;

  // ------------for contry location----- //

  countryData: any;

  locationData: string;

  displayInput: boolean;

  // -------------------Date or time variable-------------------//

  DateDisableOrNot = "";
  TimeDisabledOrNot = "";

  // ---------Messages a afficher--------//

  role: string;
  transactionType: string;

  E164PhoneNumber = "+233544990518";

  buyersOrSeller: string;
  // --------Boolean-pour activer l'affichage------------//
  BoolAffichage1: boolean;
  BoolAffichage2: boolean;
  BoolAffichage3: boolean;
  BoolAffichage4: boolean;
  BoolAffichage5: boolean;
  BoolAffichage6: boolean;
  BoolAffichage7: boolean;

  accept1: boolean;
  accept2: boolean;
  accept3: boolean;
  accept4: boolean;
  accept5: boolean;

  // ------------Controle de la couleur de la couleur de l'input-------//
  itemControl = "form-control";
  sellerPhoneNumberControl = "form-control";
  deliveryPhoneNumberControl = "form-control";
  priceControl = "form-control";
  descriptionControl = "form-control";

  first_name: string;
  email: string;
  name: string;
  mobile_phone: string;
  initiator_id: string;
  transaction_ref: string;
  currency: string;
  checkoutLink: string;
  checkoutTemplate: TemplateRef<any>;

  unsubscribe = new Subject();

  feePrice = 0;

  constructor(
    private router: Router,
    private companyService: NoworriSearchService,
    private userService: AuthserviceService,
    private geoLocationService: GeoLocationService,
    private modalService: BsModalService,
    private formbuilder: FormBuilder,
    private transactionsService: TransactionsService,
    private sanitizer: DomSanitizer
  ) {
    const sessionData = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY));
    this.first_name = sessionData.first_name;
    this.email = sessionData.email;
    this.name = sessionData.name;
    this.mobile_phone = sessionData.mobile_phone;
    this.initiator_id = sessionData.user_uid;
    if (this.mobile_phone.includes("233")) {
      this.currency = "GHS";
    } else {
      this.currency = "NGN";
    }

    const localData = JSON.parse(localStorage.getItem("noworri-escrow-0"));
    this.transactionType = localData.transactionType;
    this.role = localData.role;
    this.destinator_id = "";
    this.escrowStep1Data = {
      item: "",
      sellerPhoneNumber: "",
      deliveryPhoneNumber: "",
      price: "",
      description: "",
    };
  }

  ngOnInit() {
    this.getDataLocation();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getNoworriFee(price) {
    return (price / 100) * 1.95;
  }

  //---for only two way data binding -- alive fee result--//
  getFees(feePrice) {
    const price = (feePrice / 100) * 1.98;
    return price.toFixed(2);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: "modal-lg" })
    );
  }
  onCompleteStep1(form: NgForm, sellersForms, deliveryForms) {
    const telInputPlaceholderInputValue = document
      .getElementsByTagName("input")[0]
      .getAttribute("placeholder");
    const intelInputId = document
      .getElementsByTagName("input")[0]
      .getAttribute("data-intl-tel-input-id");
    if (telInputPlaceholderInputValue === "023 123 4567") {
      this.prefixCountryCode = "+233";
    } else if (telInputPlaceholderInputValue === "0802 123 4567") {
      this.prefixCountryCode = "+234";
    } else if (intelInputId === "2") {
      this.prefixCountryCode = "+225";
    } else {
      this.prefixCountryCode = "+233";
    }
    this.escrowStep1Data.item = form.value["item"];
    this.escrowStep1Data.price = form.value["price"];
    this.escrowStep1Data.sellerPhoneNumber = `${this.prefixCountryCode}${sellersForms.value["sellerPhoneNumber"]}`;
    this.rawDeliveryPhoneNumber = deliveryForms.value["deliveryPhoneNumber"];
    this.deliveryPhoneNumber = this.rawDeliveryPhoneNumber
      ? this.rawDeliveryPhoneNumber.split(" ").join("").substring(0)
      : `${this.prefixCountryCode}${this.deliveryPhoneNumber}`;
    this.escrowStep1Data.deliveryPhoneNumber =
      deliveryForms.value["deliveryPhoneNumber"] !== undefined
        ? `${this.prefixCountryCode}${this.deliveryPhoneNumber}`
        : `${this.prefixCountryCode}${sellersForms.value["sellerPhoneNumber"]}`;
    this.escrowStep1Data.description = form.value["description"];
    this.price = parseInt(this.escrowStep1Data.price, 10);

    this.noworriFee = this.getNoworriFee(this.price);
    this.totalAmount =
      parseInt(this.escrowStep1Data.price, 10) + this.noworriFee;
    this.rawSeller = sellersForms.value["sellerPhoneNumber"];
    this.isValidating = true;
    this.getSellerDetails(this.escrowStep1Data.sellerPhoneNumber);
  }

  processFormData() {
    if (this.escrowStep1Data.item === "") {
      this.itemControl = "form-control is-invalid";
      this.accept1 = false;
      this.isValidating = false;
    } else {
      this.itemControl = "form-control is-valid";
      this.accept1 = true;
    }
    this.inputValidation = /^-?(0|[1-9]\d*)?$/;
    if (
      !this.isValidSeller ||
      !this.escrowStep1Data.sellerPhoneNumber ||
      (this.escrowStep1Data.sellerPhoneNumber &&
        !this.escrowStep1Data.sellerPhoneNumber.match(this.inputValidation))
    ) {
      this.accept3 = true;
      this.accept4 = true;
      this.isValidNumber = true;
      this.isValidating = false;
    } else {
      this.accept3 = true;
      this.accept4 = true;
      this.isValidNumber = true;
    }
    if (this.escrowStep1Data.price && !isNaN(this.escrowStep1Data.price)) {
      this.priceControl = "form-control is-valid";
      this.accept2 = true;
    } else {
      this.priceControl = "form-control is-invalid";
      this.accept2 = false;
      this.isValidating = false;
    }

    if (this.escrowStep1Data.description === "") {
      this.descriptionControl = "form-control is-invalid";
    } else {
      this.descriptionControl = "form-control is-valid";
      this.accept5 = true;
    }
    if (
      this.accept1 === true &&
      this.accept2 === true &&
      this.accept4 === true &&
      this.accept5 === true
    ) {
      this.transactionSummary = {
        initiator_role: this.role,
        initiator_id: this.initiator_id,
        name: this.escrowStep1Data.item,
        destinator_id: this.destinator_id,
        requirement: this.escrowStep1Data.description,
        seller: this.escrowStep1Data.sellerPhoneNumber,
        transaction_type: this.transactionType,
        noworriFee: this.noworriFee.toFixed(2),
        price: this.price.toFixed(2),
        delivery_phone: this.escrowStep1Data.deliveryPhoneNumber,
        transaction_ref: "",
        currency: this.currency,
        etat: 2,
      };
      this.orderDetails = JSON.stringify(this.transactionSummary);
      localStorage.setItem(LOCAL_STORAGE_KEY, this.orderDetails);
      setTimeout(() => {
        this.isValidating = false;
        this.router.navigate(["escrowmerchandisebuyerstep2"]);
      }, 2000);
    }
  }

  getUserDetails(sellerPhoneNumber) {
    this.userService.getUserDetails(sellerPhoneNumber).subscribe(
      (user) => {
        if (isEmpty(user)) {
          this.isValidSeller = false;
        } else {
          this.destinator_id = user.user_uid;
          this.processFormData();
        }
      },
      (error) => {
        this.isValidSeller = false;
        console.log("Error %j", error.message);
      }
    );
  }

  getSellerDetails(sellerPhoneNumber) {
    if (this.rawSeller) {
      this.companyService
        .getCompanyDetails(sellerPhoneNumber)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (company: CompanyReference) => {
            if (isEmpty(company)) {
              // this.isValidSeller = false;
              this.getUserDetails(sellerPhoneNumber);
            } else {
              this.isValidSeller = true;
              this.destinator_id = company.user_id;
              this.processFormData();
            }
            return sellerPhoneNumber;
          },
          (error) => {
            this.isValidSeller = false;
            console.log("Error %j", error.message);
          }
        );
    }
  }

  // ------Affichage de chaque side a chaque click dans le champs correspondant-----------//

  AfficheSide1() {
    this.BoolAffichage1 = true;
    if ((this.BoolAffichage1 = true)) {
      this.BoolAffichage2 = false;
      this.BoolAffichage3 = false;
      this.BoolAffichage4 = false;
      this.BoolAffichage5 = false;
      this.BoolAffichage6 = false;
      this.BoolAffichage7 = false;
    }
  }
  AfficheSide2() {
    this.BoolAffichage2 = true;
    if ((this.BoolAffichage2 = true)) {
      this.BoolAffichage1 = false;
      this.BoolAffichage3 = false;
      this.BoolAffichage4 = false;
      this.BoolAffichage5 = false;
      this.BoolAffichage6 = false;
      this.BoolAffichage7 = false;
    }
  }
  AfficheSide3() {
    this.BoolAffichage3 = true;
    if ((this.BoolAffichage3 = true)) {
      this.BoolAffichage1 = false;
      this.BoolAffichage2 = false;
      this.BoolAffichage4 = false;
      this.BoolAffichage5 = false;
      this.BoolAffichage6 = false;
      this.BoolAffichage7 = false;
    }
  }
  AfficheSide4() {
    this.BoolAffichage4 = true;
    if ((this.BoolAffichage4 = true)) {
      this.BoolAffichage1 = false;
      this.BoolAffichage2 = false;
      this.BoolAffichage3 = false;
      this.BoolAffichage5 = false;
      this.BoolAffichage6 = false;
      this.BoolAffichage7 = false;
    }
  }

  AfficheSide5() {
    this.BoolAffichage5 = true;
    if ((this.BoolAffichage5 = true)) {
      this.BoolAffichage1 = false;
      this.BoolAffichage2 = false;
      this.BoolAffichage3 = false;
      this.BoolAffichage4 = false;
      this.BoolAffichage6 = false;
      this.BoolAffichage7 = false;
    }
  }

  RoutToStep2() {
    this.router.navigate(["/escrowmerchandisestep2"]);
  }

  getDataLocation() {
    new Promise((resolve) => {
      this.geoLocationService.getLocation().subscribe((data) => {
        resolve((this.locationData = data["country"]));
      });
    })
      .then(() => {
        this.countryData = {
          preferredCountries: [`${this.locationData}`],
          localizedCountries: {
            ng: "Nigeria",
            gh: "Ghana",
            ci: "Côte d'Ivoire",
          },
          onlyCountries: ["GH", "NG", "CI"],
        };
      })
      .then(() => {
        this.waitingDisplayInput = true;
      });
  }

  // onSecureFunds() {
  //   this.isSecuring = true;
  //   const transactionData = {
  //     email: this.email,
  //     amount: this.totalAmount * 100
  //   };
  //   this.transactionsService
  //     .payStackPayment(transactionData)
  //     .pipe(takeUntil(this.unsubscribe))
  //     .subscribe((response: any) => {
  //       this.modalRef.hide();
  //       this.checkoutLink = `${response.data.authorization_url}`;
  //       this.openModal(this.checkoutTemplate);
  //       this.transaction_ref = response.data.reference;
  //       setTimeout(() => {
  //         this.checkSuccessSecuredFunds(this.transaction_ref);
  //       }, 30000);
  //       return false;
  //     });
  // }

  // getCheckoutUrl() {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(this.checkoutLink);
  // }

  // // createTransaction() {
  //   this.transactionSummary['transaction_ref'] = this.transaction_ref;
  //   this.transactionsService
  //     .createTransaction(this.transactionSummary)
  //     .pipe(takeUntil(this.unsubscribe))
  //     .subscribe((transaction: any) => {
  //       this.isSecuring = false;
  //       if (transaction.initiator_id && transaction.initiator_id === this.initiator_id && transaction.initiator_role === 'buy') {
  //         this.router.navigate([`/buyermerchandisecontrat/${transaction.transaction_key}`]);
  //       } else if (transaction.initiator_id && transaction.user_id === this.initiator_id && transaction.initiator_role === 'sell') {
  //         this.router.navigate([`/sellermerchandisecontrat/${transaction.transaction_key}`]);
  //       } else {
  //         console.log('error', transaction);
  //       }
  //       return transaction;
  //     },
  //       error => {
  //         console.log(error.message);
  //       }
  //     );
  // }

  // checkSuccessSecuredFunds(ref) {
  //   const transaction_key = '';
  //   this.transactionsService
  //     .checkTransactionStatus(ref, transaction_key)
  //     .pipe(takeUntil(this.unsubscribe))
  //     .subscribe((statusData) => {
  //       if (statusData.data && statusData.data.status === 'success') {
  //         this.modalRef.hide();
  //         this.createTransaction();
  //       } else {
  //         this.ngOnInit();
  //       }
  //     });
  // }
}
