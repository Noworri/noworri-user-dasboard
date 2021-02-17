import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BusinessService } from "../../../Service/business.service";
import { DatePipe } from "@angular/common";
import { FormBuilder } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-step3",
  templateUrl: "./step3.component.html",
  styleUrls: ["./step3.component.scss"],
})
export class Step3Component implements OnInit {
  bsnessOwnerForm: FormGroup;
  businessOwnerInformation: Object;
  bsnessOwnerInputStatus = {
    owner_lname: "",
    owner_fname: "",
    dob: "",
    nationality: "",
    owner_adresse: "",
    identification_document: "",
    is_legally_registered: "",
    business_legal_name: "",
    company_documents: "",
  };
  companyDocuments;
  idDocumentFile: File;
  cdDocumentFile: File;
  unsubscribe = new Subject();

  isIdUpload: boolean;
  isCdUpload: boolean;
  idUploadMessge = "Upload or drop";
  isCdUploadMessge = "Upload or drop";
  rawDate = "";
  dateFormated = "";
  isLegalFomDisplay: boolean;
  isLegallyRegistered = "";

  allCreatBusinessData: object;
  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private datepipe: DatePipe,
    private creatBusinessService: BusinessService
  ) {}
  ngOnInit() {
    this.businessAdressFormInit();
  }
  businessAdressFormInit() {
    this.bsnessOwnerForm = this.formbuilder.group({
      owner_lname: "",
      owner_fname: "",
      dob: "",
      nationality: "",
      owner_adresse: "",
      identification_document: "",
      identification_documentUpload: "",
      company_documents: "",
      is_legally_registered: "",
      business_legal_name: "",
      company_documentUpload: "",
    });
  }

  onSaveOwnerInformation() {
    this.getBusinessOwnerInformation();
    if (
      this.bsnessOwnerInputStatus.owner_lname === "form-control is-valid" &&
      this.bsnessOwnerInputStatus.owner_fname === "form-control is-valid" &&
      this.bsnessOwnerInputStatus.dob === "form-control is-valid" &&
      this.bsnessOwnerInputStatus.nationality === "form-control is-valid" &&
      this.bsnessOwnerInputStatus.owner_adresse === "form-control is-valid" &&
      this.bsnessOwnerInputStatus.identification_document ===
        "form-control is-valid" &&
      this.bsnessOwnerInputStatus.is_legally_registered ===
        "form-control is-valid" &&
      this.bsnessOwnerInputStatus.business_legal_name ===
        "form-control is-valid" &&
      this.bsnessOwnerInputStatus.company_documents === "form-control is-valid"
    ) {
      this.getAllCreatBusinessData();

      setTimeout(() => {
        this.createBusiness();
      }, 2000);
    }
  }

  createBusiness() {
    this.creatBusinessService
      .createNewBusiness(this.allCreatBusinessData)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        if (data) {
          this.router.navigate(["/home"]);
        }
      }),
      (error) => {
        console.log(error);
      };
  }

  onGetRadioButtonValue(e) {
    this.isLegallyRegistered = e.value;
    if (this.isLegallyRegistered === "YES") {
      this.isLegalFomDisplay = true;
    } else {
      this.isLegalFomDisplay = false;
    }
  }

  getAllCreatBusinessData() {
    let businessFormData = JSON.parse(sessionStorage.getItem("businessInfo"));
    let businessAdrssInfo = JSON.parse(
      sessionStorage.getItem("businessAdressInfo")
    );
    let userId = JSON.parse(localStorage.getItem("noworri-user-session"));
    this.allCreatBusinessData = {
      user_id: userId.user_uid,
      status: "pending",
      ...businessFormData,
      ...businessAdrssInfo,
      ...this.businessOwnerInformation,
    };
  }

  onSelectIdocument(file: File) {
    this.idDocumentFile = file;
    this.idUploadMessge = this.idDocumentFile["name"];
  }

  onSelectCompanyDocuments(file: File) {
    this.companyDocuments = file;
    this.isCdUploadMessge = this.idDocumentFile["name"];
  }

  getBusinessOwnerInformation() {
    this.rawDate = this.bsnessOwnerForm.get("dob").value;
    this.dateFormated = this.datepipe.transform(this.rawDate, "dd/MM/yyyy");
    this.businessOwnerInformation = {
      owner_fname: this.bsnessOwnerForm.get("owner_fname").value,
      owner_lname: this.bsnessOwnerForm.get("owner_lname").value,
      dob: this.dateFormated,
      nationality: this.bsnessOwnerForm.get("nationality").value,
      owner_adresse: this.bsnessOwnerForm.get("owner_adresse").value,
      identification_document: this.bsnessOwnerForm.get(
        "identification_document"
      ).value,
      identification_documentUpload: this.idDocumentFile,
      is_legally_registered: this.isLegallyRegistered,
      business_legal_name: this.bsnessOwnerForm.get("business_legal_name")
        .value,
      company_documentUpload: this.companyDocuments,
    };
    this.processingData(this.businessOwnerInformation);
  }
  processingData(businessOwnerInformation) {
    if (this.isLegallyRegistered === "NO") {
      businessOwnerInformation.business_legal_name = "null";
      this.companyDocuments = "null";
    }
    this.bsnessOwnerInputStatus.owner_fname = businessOwnerInformation.owner_fname
      ? "form-control is-valid"
      : "form-control is-invalid";
    this.bsnessOwnerInputStatus.owner_lname = businessOwnerInformation.owner_lname
      ? "form-control is-valid"
      : "form-control is-invalid";
    this.bsnessOwnerInputStatus.dob = businessOwnerInformation.dob
      ? "form-control is-valid"
      : "form-control is-invalid";
    this.bsnessOwnerInputStatus.nationality = businessOwnerInformation.nationality
      ? "form-control is-valid"
      : "form-control is-invalid";
    this.bsnessOwnerInputStatus.owner_adresse = businessOwnerInformation.owner_adresse
      ? "form-control is-valid"
      : "form-control is-invalid";
    this.bsnessOwnerInputStatus.is_legally_registered = businessOwnerInformation.is_legally_registered
      ? "form-control is-valid"
      : "form-control is-invalid";
    this.bsnessOwnerInputStatus.business_legal_name = businessOwnerInformation.business_legal_name
      ? "form-control is-valid"
      : "form-control is-invalid";
    this.bsnessOwnerInputStatus.identification_document = businessOwnerInformation.identification_document
      ? "form-control is-valid"
      : "form-control is-invalid";
    this.bsnessOwnerInputStatus.company_documents = this.companyDocuments
      ? "form-control is-valid"
      : "form-control is-invalid";
    this.isIdUpload = this.businessOwnerInformation[
      "identification_documentUpload"
    ]
      ? false
      : true;
    this.isCdUpload = this.businessOwnerInformation["company_documentUpload"]
      ? false
      : true;
  }
}
