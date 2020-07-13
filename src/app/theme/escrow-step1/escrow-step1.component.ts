import { Router } from "@angular/router";
import { Escrowstep1Service } from "./../../Service/escrowstep1.service";
import { FormGroup, FormBuilder, NgForm } from "@angular/forms";
import { HomeInputService } from "./../../Service/home-input.service";

import { Component, OnInit } from "@angular/core";
import {FormControl} from '@angular/forms';

import { NoworriSearchService } from 'src/app/Service/noworri-search.service';
import { disableBindings } from '@angular/core/src/render3';


@Component({
  selector: "app-escrow-step1",
  templateUrl: "./escrow-step1.component.html",
  styleUrls: ["./escrow-step1.component.scss"],
})
export class EscrowStep1Component implements OnInit {
  

 




  searchInputType1: RegExp;
  searchInputType2: RegExp;


  //-------------------Date or time variable-------------------//

  DateDisableOrNot=''

  TimeDisabledOrNot=''

  //--------Donnee recuperees des Inputs du composant Home--------//
  TypeOfTransation: string;
  YourRole: string;
  //---------Messages a afficher--------//

  BuyinOrSelling: string;

  BuyersOrSeller: string;
  //--------Boolean-pour activer l'affichage------------//
  BoolAffichage1: boolean;
  BoolAffichage2: boolean;
  BoolAffichage3: boolean;
  BoolAffichage4: boolean;
  BoolAffichage5: boolean;
  BoolAffichage6: boolean;
  BoolAffichage7: boolean;

  Accept1: boolean;
  Accept2: boolean;
  Accept3: boolean;
  Accept4: boolean;
  Accept5: boolean;
  Accept6: boolean;

  //------------Controle de la couleur de la couleur de l'input-------//
  InputControl1 = "form-control";
  InputControl2 = "form-control";
  InputControl3 = "form-control";
  InputControl4 = "form-control";
  InputControl5 = "form-control";
  InputControl6 = "form-control";

  constructor(
    private HomeInputService: HomeInputService,
    private EscrowStep1: Escrowstep1Service,
    private Router: Router
  ) {
    
  }

  ngOnInit() {
    this.RoleMessage();
     
    
  }
  //---Controle et envoi des donnees des champs, vers les objets du HomeInputService----------//
  escrowstep1(F: NgForm) {
    this.EscrowStep1.inputGroupSelect1 = F.value["exampleInputPassword1"];
    this.EscrowStep1.inputGroupSelect2 = F.value["exampleInputPassword2"];
    this.EscrowStep1.inputGroupSelect3 = F.value["exampleInputPassword3"];
    this.EscrowStep1.inputGroupSelect4 = F.value["exampleInputPassword4"];
    this.EscrowStep1.inputGroupSelect5 = F.value["exampleInputPassword5"];
    this.EscrowStep1.inputGroupSelect6 = F.value["exampleInputPassword6"];

    if (this.EscrowStep1.inputGroupSelect1 === "") {
      this.InputControl1 = "form-control is-invalid";
      this.Accept1 = false;
    } else if (this.EscrowStep1.inputGroupSelect1) {
      this.InputControl1 = "form-control is-valid";
      this.Accept1 = true;
    }
    this.searchInputType1 = /^\d*\d*$/;

    if (
      this.EscrowStep1.inputGroupSelect2 &&
      this.EscrowStep1.inputGroupSelect2.match(this.searchInputType1)
    ) {
      this.InputControl2 = "form-control is-valid";
      this.Accept2 = true;
    } else {
      this.InputControl2 = "form-control is-invalid";
      this.Accept2 = false;
    }
    this.searchInputType2 = /^-?(0|[1-9]\d*)?$/;
    if (
      this.EscrowStep1.inputGroupSelect3 &&
      this.EscrowStep1.inputGroupSelect3.match(this.searchInputType2)
    ) {
      this.InputControl3 = "form-control is-valid";
      this.Accept3 = true;
    } else {
      this.InputControl3 = "form-control is-invalid";
      this.Accept3 = false;
    }
    this.searchInputType2 = /^-?(0|[1-9]\d*)?$/;
    if (
      this.EscrowStep1.inputGroupSelect4 &&
      this.EscrowStep1.inputGroupSelect4.match(this.searchInputType2) &&
      this.EscrowStep1.inputGroupSelect4 <= 10
    ) {
      this.InputControl4 = "form-control is-valid";
      this.Accept4 = true;
    } else {
      this.InputControl4 = "form-control is-invalid";
      this.Accept4 = false;
    }
    this.searchInputType2 = /^-?(0|[1-9]\d*)?$/;
    if (
      this.EscrowStep1.inputGroupSelect5 &&
      this.EscrowStep1.inputGroupSelect5.match(this.searchInputType2)
    ) {
      this.InputControl5 = "form-control is-valid";
      this.Accept5 = true;
    } else {
      this.InputControl5 = "form-control is-invalid";
      this.Accept5 = false;
    }
    if (this.EscrowStep1.inputGroupSelect6 === "") {
      this.InputControl6 = "form-control is-invalid";
      this.Accept6 = false;
    } else if (this.EscrowStep1.inputGroupSelect6) {
      this.InputControl6 = "form-control is-valid";
      this.Accept6 = true;
    }
    if (
      this.Accept1 == true &&
      this.Accept2 == true &&
      this.Accept3 == true &&
      this.Accept4 == true &&
      this.Accept5 == true &&
      this.Accept6 == true
    ) {
      this.Router.navigate(["/escrowstep2"]);
    }
  }



  //-----Methode de recup et affichage de message--------//
  RoleMessage() {
    this.TypeOfTransation = this.HomeInputService.DataInputHome.TypeOfTransation;
    this.YourRole = this.HomeInputService.DataInputHome.YourRole;
    if ((this.YourRole = "Buyer")) {
      this.BuyersOrSeller = "BUYER'S";
      this.BuyinOrSelling = "BUYING";
    }
    if ((this.YourRole = "Seller")) {
      this.BuyersOrSeller = "SELLER'S";
      this.BuyinOrSelling = "SELLING";
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
      this.BoolAffichage3 = false;
      this.BoolAffichage5 = false;
      this.BoolAffichage6 = false;
      this.BoolAffichage7 = false;
    }
  }
  AfficheSide5() {
  this.Opendate()
    this.BoolAffichage5 = true;
    if ((this.BoolAffichage5 = true)) {
      this.BoolAffichage4 = false;
      this.BoolAffichage6 = false;
      this.BoolAffichage7 = false;
    }
  }
  AfficheSide6() {
    this.OpenTime()
    this.BoolAffichage6 = true;
    if ((this.BoolAffichage6 = true)) {
      this.BoolAffichage5 = false;
      this.BoolAffichage7 = false;
    }
  }
  AfficheSide7() {
    this.BoolAffichage7 = true;
    if ((this.BoolAffichage7 = true)) {
      this.BoolAffichage3 = false;
      this.BoolAffichage4 = false;
      this.BoolAffichage5 = false;
      this.BoolAffichage6 = false;
    }
  }


//----------------0pen time Methode-----------------------//
Opendate(){
if(this.TimeDisabledOrNot==''){
  this.TimeDisabledOrNot='disabled'
}
}
OpenTime(){
if(this.DateDisableOrNot==''){
  this.DateDisableOrNot='disabled'
}
}
}
