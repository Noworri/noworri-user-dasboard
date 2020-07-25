import { Router } from '@angular/router';
import { Escrowstep1Service } from './../../Service/escrowstep1.service';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { HomeInputService } from './../../Service/home-input.service';

import { Component, OnInit } from '@angular/core';

const LOCAL_STORAGE_KEY = 'noworri-escrow-0';

@Component({
  selector: 'app-escrow-step1',
  templateUrl: './escrow-step1.component.html',
  styleUrls: ['./escrow-step1.component.scss'],
})
export class EscrowStep1Component implements OnInit {
  // -----------For input control-----------------------//
  searchInputType1: RegExp;
  searchInputType2: RegExp;

  // --------For date control------------------------//
  minDate: Date;

  // -------------------Date or time variable-------------------//

  transation: FormGroup;

  // ---------Messages a afficher--------//

  role: string;
  transactionType: string;

  E164PhoneNumber = '+233544990518';

  buyerOrSeller: string;

  // boolean for display hour or days input -----//

  DayInput: boolean;
  HourInput: boolean;

  // --------Boolean-pour activer l'affichage------------//
  BoolAffichage1: boolean;
  BoolAffichage2: boolean;
  BoolAffichage3: boolean;
  BoolAffichage4: boolean;
  BoolAffichage5: boolean;
  BoolAffichage6: boolean;
  BoolAffichage7: boolean;
  BoolAffichage8: boolean;

  Accept1: boolean;
  Accept2: boolean;
  Accept3: boolean;
  Accept4: boolean;
  Accept5: boolean;
  Accept6: boolean;

  // ------------Controle de la couleur de la couleur de l'input-------//
  InputControl1 = 'form-control';
  InputControl2 = 'form-control';
  InputControl3 = 'form-control';
  InputControl4 = 'form-control';
  InputControl5 = 'form-control';
  InputControl6 = 'form-control';
  InputControl7 = 'form-control';

  constructor(
    // private HomeInputService: HomeInputService,
    private escrowStep1: Escrowstep1Service,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    const localData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    this.transactionType = localData.transactionType;
    if (localData.role === 'Buyer') {
      this.buyerOrSeller = `Buyer's`;
      this.role = 'Buying';
    } else {
      this.buyerOrSeller = `Seller's`;
      this.role = 'Selling';
    }
    this.setDateControle();
  }

  ngOnInit() {
    this.TransationDeadInit();
  }
  // ---Controle et envoi des donnees des champs, vers les objets du HomeInputService----------//
  fescrowStep1(F: NgForm, form) {
    this.escrowStep1.inputGroupSelect1 = F.value['exampleInputPassword1'];
    this.escrowStep1.inputGroupSelect2 = form.value['phone_number'];
    this.escrowStep1.inputGroupSelect3 = F.value['exampleInputPassword3'];
    this.escrowStep1.inputGroupSelect4 = F.value['exampleInputPassword4'];
    this.escrowStep1.inputGroupSelect5 = F.value['exampleInputPassword5'];
    this.escrowStep1.inputGroupSelect6 = F.value['exampleInputPassword6'];
    this.escrowStep1.inputGroupSelect7 = F.value['exampleInputPassword7'];

    if (this.escrowStep1.inputGroupSelect1 === '') {
      this.InputControl1 = 'form-control is-invalid';
      this.Accept1 = false;
    } else if (this.escrowStep1.inputGroupSelect1) {
      this.InputControl1 = 'form-control is-valid';
      this.Accept1 = true;
    }
    this.searchInputType1 = /^\d*\d*$/;

    if (
      this.escrowStep1.inputGroupSelect2 &&
      this.escrowStep1.inputGroupSelect2.match(this.searchInputType1)
    ) {
      this.InputControl2 = 'form-control is-valid';
      this.Accept2 = true;
    } else {
      this.InputControl2 = 'form-control is-invalid';
      this.Accept2 = false;
    }
    this.searchInputType2 = /^-?(0|[1-9]\d*)?$/;
    if (
      this.escrowStep1.inputGroupSelect3 &&
      this.escrowStep1.inputGroupSelect3.match(this.searchInputType2)
    ) {
      this.InputControl3 = 'form-control is-valid';
      this.Accept3 = true;
    } else {
      this.InputControl3 = 'form-control is-invalid';
      this.Accept3 = false;
    }
    this.searchInputType2 = /^-?(0|[1-9]\d*)?$/;
    if (
      this.escrowStep1.inputGroupSelect4 &&
      this.escrowStep1.inputGroupSelect4.match(this.searchInputType2) &&
      this.escrowStep1.inputGroupSelect4 <= 10
    ) {
      this.InputControl4 = 'form-control is-valid';
      this.Accept4 = true;
    } else {
      this.InputControl4 = 'form-control is-invalid';
      this.Accept4 = false;
    }
    this.searchInputType2 = /^-?(0|[1-9]\d*)?$/;
    // if (
    //   this.EscrowStep1.inputGroupSelect5 &&
    //   this.EscrowStep1.inputGroupSelect5.match(this.searchInputType2)
    // ) {
    //   this.InputControl5 = 'form-control is-valid';
    //   this.Accept5 = true;
    // } else {
    //   this.InputControl5 = 'form-control is-invalid';
    //   this.Accept5 = false;
    // }
    if (this.escrowStep1.inputGroupSelect7 === '') {
      this.InputControl6 = 'form-control is-invalid';
      this.Accept6 = false;
    } else if (this.escrowStep1.inputGroupSelect7) {
      this.InputControl6 = 'form-control is-valid';
      this.Accept6 = true;
    }
    if (
      this.Accept1 === true &&
      this.Accept2 === true &&
      this.Accept3 === true &&
      this.Accept4 === true &&
      this.Accept5 === true &&
      this.Accept6 === true
    ) {
      this.router.navigate(['/escrowstep2']);
    }
    this.router.navigate(['/escrowstep2']);
  }

  // ------Affichage de chaque side a chaque click dans le chanps corespondant-----------//

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
  AfficheSide6() {
    this.BoolAffichage6 = true;
    if ((this.BoolAffichage6 = true)) {
      this.BoolAffichage1 = true;
      this.BoolAffichage2 = true;
      this.BoolAffichage3 = true;
      this.BoolAffichage4 = true;
      this.BoolAffichage5 = true;
      this.BoolAffichage7 = true;
    }
  }
  AfficheSide7() {
    this.BoolAffichage7 = true;
    if ((this.BoolAffichage7 = true)) {
      this.BoolAffichage1 = false;
      this.BoolAffichage2 = false;
      this.BoolAffichage3 = false;
      this.BoolAffichage4 = false;
      this.BoolAffichage5 = false;
      this.BoolAffichage6 = false;
    }
  }
  AfficheSide8() {
    this.BoolAffichage8 = true;
    if ((this.BoolAffichage8 = true)) {
      this.BoolAffichage1 = false;
      this.BoolAffichage2 = false;
      this.BoolAffichage3 = false;
      this.BoolAffichage4 = false;
      this.BoolAffichage5 = false;
      this.BoolAffichage6 = false;
      this.BoolAffichage7 = false;
    }
  }

  // ----------------transation dead line button methode-----------------------//
  TransationDeadInit() {
    this.transation = this.formBuilder.group({
      radio: '',
    });
  }
  TransationDead() {
    const transation = this.transation.get('radio').value;
    if (transation === 'Days') {
      this.HourInput = false;
      this.DayInput = true;
    } else if (transation === 'Hours') {
      this.DayInput = false;
      this.HourInput = true;
    }
  }
  // -------for date controle --------------------------------//
  setDateControle() {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
  }
}
