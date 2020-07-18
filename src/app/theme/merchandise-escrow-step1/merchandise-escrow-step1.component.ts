import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import {
  MerchandiseEscrowstep1Reference,
  CompanyReference,
} from "src/app/Service/reference-data.interface";
import { NoworriSearchService } from "src/app/Service/noworri-search.service";
import { isEmpty } from "lodash";

const LOCAL_STORAGE_KEY = "merchandise-escrow-1";

@Component({
  selector: "app-merchandise-escrow-step1",
  templateUrl: "./merchandise-escrow-step1.component.html",
  styleUrls: ["./merchandise-escrow-step1.component.scss"],
})
export class MerchandiseEscrowStep1Component implements OnInit, OnDestroy {
  isValidSeller = true;
  rawSeller: string;
  isValidNumber = true;

  noworriFee: number;
  totalAmount: number;
  owner_id: string;
  price: number;
  escrowStep1Data: MerchandiseEscrowstep1Reference;

  inputValidation: RegExp;

  //-------------------Date or time variable-------------------//

  DateDisableOrNot = "";
  TimeDisabledOrNot = "";

  //---------Messages a afficher--------//

  buyinOrSelling: string;
  transactionType: string;

  E164PhoneNumber = "+233544990518";

  buyersOrSeller: string;
  //--------Boolean-pour activer l'affichage------------//
  BoolAffichage1: boolean;
  BoolAffichage2: boolean;
  BoolAffichage3: boolean;
  BoolAffichage4: boolean;
  BoolAffichage5: boolean;
  BoolAffichage6: boolean;

  Accept1: boolean;
  Accept2 = true;
  Accept3: boolean;
  Accept4: boolean;
  Accept5: boolean;

  //------------Controle de la couleur de la couleur de l'input-------//
  itemControl = "form-control";
  sellerPhoneNumberControl = "form-control";
  deliveryPhoneNumberControl = "form-control";
  priceControl = "form-control";
  descriptionControl = "form-control";

  constructor(
    private router: Router,
    private companyService: NoworriSearchService
  ) {
    const localData = JSON.parse(localStorage.getItem("noworri-escrow-0"));
    this.transactionType = localData.transactionType;
    this.buyinOrSelling = localData.role;
    this.owner_id = "";
    this.escrowStep1Data = {
      item: "",
      sellerPhoneNumber: "",
      deliveryPhoneNumber: "",
      price: "",
      description: "",
    };
  }

  ngOnInit() {}

  ngOnDestroy() {}

  getNoworriFee(price) {
    return (price / 100) * 1.95;
  }

  onCompleteStep1(F: NgForm, formDelivery, formSeller) {
    this.rawSeller = formSeller.value["sellerPhoneNumber"];
    this.escrowStep1Data.item = F.value["item"];
    this.escrowStep1Data.sellerPhoneNumber = `+233${formSeller.value["sellerPhoneNumber"]}`;
    this.escrowStep1Data.deliveryPhoneNumber = `+233${formDelivery.value["deliveryPhoneNumber"]}`;
    this.escrowStep1Data.price = F.value["price"];
    this.escrowStep1Data.description = F.value["description"];
    this.price = parseInt(this.escrowStep1Data.price);
    this.noworriFee = this.getNoworriFee(this.price);
    this.totalAmount = parseInt(this.escrowStep1Data.price) + this.noworriFee;
    this.getCompanyDetails(this.escrowStep1Data.sellerPhoneNumber);
    setTimeout(() => {
      if (this.escrowStep1Data.item === "") {
        this.itemControl = "form-control is-invalid";
        this.Accept1 = false;
      } else {
        this.itemControl = "form-control is-valid";
        this.Accept1 = true;
      }
      this.inputValidation = /^-?(0|[1-9]\d*)?$/;
      if (
        !this.isValidSeller ||
        this.rawSeller == "" ||
        (this.rawSeller && !this.rawSeller.match(this.inputValidation))
      ) {
        this.Accept2 = false;
        this.isValidNumber = false;
      } else {
        this.Accept2 = true;
        this.isValidNumber = true;
      }
      if (this.escrowStep1Data.price && !isNaN(this.escrowStep1Data.price)) {
        this.priceControl = "form-control is-valid";
        this.Accept4 = true;
      } else {
        this.priceControl = "form-control is-invalid";
        this.Accept4 = false;
      }

      this.descriptionControl = "form-control is-valid";
      this.Accept5 = true;

      if (
        this.Accept1 == true &&
        this.Accept2 == true &&
        this.Accept4 == true &&
        this.Accept5 == true
      ) {
        const transactionSummary = {
          owner_id: this.owner_id,
          item: this.escrowStep1Data.item,
          seller: this.escrowStep1Data.sellerPhoneNumber,
          amount: this.totalAmount.toFixed(2),
          description: this.escrowStep1Data.description,
          transactionType: this.transactionType,
          role: this.buyinOrSelling,
          noworriFee: this.noworriFee.toFixed(2),
          price: this.price.toFixed(2),
        };

        const orderDetails = JSON.stringify(transactionSummary);
        localStorage.setItem(LOCAL_STORAGE_KEY, orderDetails);
        setTimeout(() => {
          this.router.navigate(["/escrowmerchandisestep2"]);
        }, 2000);
      }
    }, 1000);
  }

  // get company details
  getCompanyDetails(sellerPhoneNumber) {
    if (this.rawSeller) {
      this.companyService.getCompanyDetails(sellerPhoneNumber).subscribe(
        (company: CompanyReference) => {
          if (isEmpty(company)) {
            this.isValidSeller = false;
          } else {
            this.isValidSeller = true;
            this.owner_id = company.user_id;
          }
        },
        (error) => {
          console.log("Error %j", error.message);
        }
      );
    }
  }

  //------Affichage de chaque side a chaque click dans le chanps corespondant-----------//

  AfficheSide1() {
    this.BoolAffichage1 = true;
    if ((this.BoolAffichage1 = true)) {
      this.BoolAffichage2 = false;
      this.BoolAffichage3 = false;
      this.BoolAffichage4 = false;
      this.BoolAffichage5 = false;
    }
  }
  AfficheSide2() {
    this.BoolAffichage2 = true;
    if ((this.BoolAffichage2 = true)) {
      this.BoolAffichage1 = false;
      this.BoolAffichage3 = false;
      this.BoolAffichage4 = false;
      this.BoolAffichage5 = false;
    }
  }
  AfficheSide3() {
    this.BoolAffichage3 = true;
    if ((this.BoolAffichage3 = true)) {
      this.BoolAffichage2 = false;
      this.BoolAffichage4 = false;
      this.BoolAffichage5 = false;
    }
  }
  AfficheSide4() {
    this.BoolAffichage4 = true;
    if ((this.BoolAffichage4 = true)) {
      this.BoolAffichage3 = false;
      this.BoolAffichage5 = false;
    }
  }
  AfficheSide5() {
    this.BoolAffichage5 = true;
    if ((this.BoolAffichage5 = true)) {
      this.BoolAffichage4 = false;
    }
  }

  RoutToStep2() {
    this.router.navigate(["/escrowmerchandisestep2"]);
  }
}
