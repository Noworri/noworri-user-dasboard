import { Router } from "@angular/router";
import {
  NgForm,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { NoworriSearchService } from "src/app/Service/noworri-search.service";
import { CompanyReference } from "src/app/Service/reference-data.interface";
import { template } from "@angular/core/src/render3";
import { STRING_TYPE } from "@angular/compiler/src/output/output_ast";
import { isEmpty } from 'lodash';

@Component({
  selector: "app-search-page",
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.scss"],
})
export class SearchPageComponent implements OnInit {
  seachValue1 = ["Business name"];
  seachValue2 = ["Business phone number"];
  NumSpanAffichage: string;
  modalRef: BsModalRef | null;
  isValideInputType: boolean;

  ValidInvalidColor: string;
  LoadingStatus: boolean;
  SearchButtonStatus = true;

  form: FormGroup;
  phoneNumber: string;
  searchInputNumberValue: string;
  searchInputType: any;

  constructor(
    private Router: Router,
    private modalService: BsModalService,
    private searchService: NoworriSearchService
  ) {
    this.form = new FormGroup({
      phoneNumber: new FormControl("", [Validators.pattern("[0-9]")]),
      NumSpanAffichage: new FormControl(),
    });
  }

  ngOnInit() {
    this.NumSpanAffichage = "+233";
  }

  //-----------------input type validation function-------------------------//
  validateInputType(phoneNumber) {
    this.searchInputType = /^\d*\d*$/;
    if (phoneNumber.match(this.searchInputType)) {
      return this.isValideInputType = true;
    } else {
      return this.isValideInputType = false;
    }
  }

  //-----------------search function -------------------------------------//
  OnNoworriSearch(modalTemplate: TemplateRef<any>) {
    this.searchInputNumberValue = this.form.get("phoneNumber").value;
    this.validateInputType(this.searchInputNumberValue);

    //----- if input data is not correct ------//
    if (
      this.searchInputNumberValue == null ||
      this.searchInputNumberValue.length < 9 ||
      this.searchInputNumberValue.length > 9 ||
      !this.isValideInputType
    ) {
      this.ValidInvalidColor = "is-invalid";
      //----------if input data is correct -----------//
    } else {
      this.ValidInvalidColor = "is-valid";
      this.SearchButtonStatus = false;
      this.LoadingStatus = true;
      this.phoneNumber = this.NumSpanAffichage + this.searchInputNumberValue;
      this.searchService.countSearch(this.phoneNumber).subscribe(response => {
        return response;
      });
      this.searchService.getCompanyDetails(this.phoneNumber).subscribe(
        (company: CompanyReference) => {
          if (isEmpty(company)) {
            this.modalRef = this.modalService.show(modalTemplate, {
              class: "modal-sm",
            });
            this.ValidInvalidColor = "";
            this.LoadingStatus = false;
            this.SearchButtonStatus = true;
          } else {
            this.Router.navigate(["/noworrisearchresult/" + this.phoneNumber]);
          }
        },
        (error) => {
          console.log("Error %j", error.message);
        }
      );
    }
  }

  //------------Close modale-----------------------------------//
  CloseModal() {
    this.modalRef.hide();
  }
  //----------------Page routing-----------------------------//

  RoutingLandingPage() {
    this.Router.navigate(["/whatnoworri"]);
  }
}
