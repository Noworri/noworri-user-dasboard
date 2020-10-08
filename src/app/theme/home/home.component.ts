import { Router } from '@angular/router';
import { HomeInputService } from './../../Service/home-input.service';

import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { NgForm } from '@angular/forms';

const LOCAL_STORAGE_KEY = 'noworri-escrow-0';
const SESSION_STORAGE_KEY = 'user_session_data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  TypeOfTransationInputControl = 'custum-select';
  YourRoleInputControl = 'custom-select ';

  constructor(
    private homeInputService: HomeInputService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  // ---Controle et envoi des donnees des champs, vers les objets du HomeInputService----------//
  OnSubmit(F: NgForm) {
    this.homeInputService.DataInputHome.TypeOfTransation =
      F.value['TypeOfTransation'];
    this.homeInputService.DataInputHome.YourRole =
      F.value['role'];
    const escrow0Data = {
      transactionType: this.homeInputService.DataInputHome.TypeOfTransation,
      role: this.homeInputService.DataInputHome.YourRole,
    };
    const escrow0LocalData = JSON.stringify(escrow0Data);
    localStorage.setItem(LOCAL_STORAGE_KEY, escrow0LocalData);
    if (this.homeInputService.DataInputHome.TypeOfTransation === '' &&
      this.homeInputService.DataInputHome.YourRole === '') {
      this.TypeOfTransationInputControl = 'custom-select is-invalid';
      this.YourRoleInputControl = 'custom-select is-invalid'
    } else if (this.homeInputService.DataInputHome.TypeOfTransation === '' &&
      this.homeInputService.DataInputHome.YourRole) {
      this.TypeOfTransationInputControl = 'custom-select is-invalid';
      this.YourRoleInputControl = 'custom-select is-valid'
    } else if (this.homeInputService.DataInputHome.TypeOfTransation &&
      this.homeInputService.DataInputHome.YourRole === '') {
      this.TypeOfTransationInputControl = 'custom-select is-valid';
      this.YourRoleInputControl = 'custom-select is-invalid'
    } else if (
      this.homeInputService.DataInputHome.TypeOfTransation === 'Services' &&
      this.homeInputService.DataInputHome.YourRole === 'Buyer'
    ) {
      this.router.navigate(['escrowservicebuyerstep1']);
    } else if (
      this.homeInputService.DataInputHome.TypeOfTransation === 'Services' &&
      this.homeInputService.DataInputHome.YourRole === 'Seller'
    ) {
      this.router.navigate(['escrowservicesellerstep1']);
    } else if (
      this.homeInputService.DataInputHome.TypeOfTransation === 'Merchandise' &&
      this.homeInputService.DataInputHome.YourRole === 'Buyer') {
      this.router.navigate(['escrowmerchandisebuyerstep1'])
    } else if (this.homeInputService.DataInputHome.TypeOfTransation === 'Merchandise' &&
      this.homeInputService.DataInputHome.YourRole === 'Seller') {
      this.router.navigate(['escrowmerchandisesellerstep1'])
    }
  }
}
