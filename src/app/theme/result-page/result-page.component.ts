import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, Input } from "@angular/core";
import { NoworriSearchService } from "src/app/Service/noworri-search.service";
import { CompanyReference } from "src/app/Service/reference-data.interface";
import { FormGroup, FormBuilder } from "@angular/forms";
import { withLatestFrom } from 'rxjs/operators';

@Component({
  selector: "app-result-page",
  templateUrl: "./result-page.component.html",
  styleUrls: ["./result-page.component.scss"],
})
export class ResultPageComponent implements OnInit {
 RealPictureProfil:boolean
 FalsePictureProfil:boolean


  businessname: string;
  profilpicture: string;
  city: string;
  sector: string;
  services: string[];
  country: string;
  businessphone: string;
  additionnalphone: string[];
  identitycardverifyfile: string;
  facebook: string;
  instagram: string;
  identitycard: string;
  whatsapp: string;
  state: string;
  company_id: string;
  created_at: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private searchService: NoworriSearchService
  ) { }

  ngOnInit() {
    const phoneNumber = this.route.snapshot.paramMap.get("phoneNumber");
    this.searchService.getCompanyDetails(phoneNumber).subscribe(
      (company: CompanyReference) => {
          this.businessname = company.businessname;
          this.profilpicture = company.profilpicture;
          this.city = company.city;
          this.sector = company.sector;
          const services = company.services;
          this.services = services.split(",");
          this.country = company.country;
          this.businessphone = company.businessphone;
          const additionnalphone = company.additionnalphone;
          this.additionnalphone = additionnalphone.split(",");
          this.identitycardverifyfile = company.identitycardverifyfile;
          this.facebook = company.facebook;
          this.instagram = company.instagram;
          this.whatsapp = company.whatsapp;
          this.state = company.state;
          this.created_at = company.created_at;
          this.identitycard = company.identitycard;
      },
      (error) => {
        console.log("Error %j", error.message);
      }
    );
   this.DefaultPictureOrNot()
  }
  //-------------On openDispute function----//
  onOpenDispute() {
    this.router.navigate(["/disputepage/" + this.businessname]);
  }
  //---------------Routing out to searchPage-------------------------//
  RoutingOutToSearchPage() {
    this.router.navigate([""]);
  }

  //------------------------Pin up default image or not---------------------------//
 DefaultPictureOrNot(){
   setTimeout(()=>{
   if(this.profilpicture){
     this.RealPictureProfil=true
   }else{
     this.RealPictureProfil=false
     this.FalsePictureProfil=true
   }
   },7000)
 }
}
