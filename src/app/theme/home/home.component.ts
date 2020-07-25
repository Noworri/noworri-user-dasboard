import { Router } from '@angular/router';
import { HomeInputService } from './../../Service/home-input.service';

import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { NgForm } from '@angular/forms';

const LOCAL_STORAGE_KEY = 'noworri-escrow-0';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  InputControl = 'custom-select ValidationColor';

  constructor(
    private homeInputService: HomeInputService,
    private router: Router
  ) {}

  ngOnInit() {}
  // ---Controle et envoi des donnees des champs, vers les objets du HomeInputService----------//
  OnSubmit(F: NgForm) {
    this.homeInputService.DataInputHome.TypeOfTransation =
      F.value['inputGroupSelect01'];
    this.homeInputService.DataInputHome.YourRole =
      F.value['inputGroupSelect02'];
    if (this.homeInputService.DataInputHome.TypeOfTransation === '') {
      this.InputControl = 'custom-select ValidationColor is-invalid';
    } else if (this.homeInputService.DataInputHome.YourRole === '') {
      this.InputControl = 'custom-select ValidationColor is-invalid';
    } else if (
      this.homeInputService.DataInputHome.TypeOfTransation === 'Merchandise' &&
      this.homeInputService.DataInputHome.YourRole === 'Buyer'
    ) {
      const escrow0Data = {
        transactionType: this.homeInputService.DataInputHome.TypeOfTransation,
        role: this.homeInputService.DataInputHome.YourRole,
      };
      const escrow0LocalData = JSON.stringify(escrow0Data);
      localStorage.setItem(LOCAL_STORAGE_KEY, escrow0LocalData);
      this.router.navigate(['/escrowmerchandisestep1']);
    } else if (
      this.homeInputService.DataInputHome.TypeOfTransation === 'Merchandise' &&
      this.homeInputService.DataInputHome.YourRole === 'Seller'
    ) {
      this.router.navigate(['/sellerescrowmerchandisestep1']);
    } else {
      this.InputControl = 'custom-select ValidationColor is-valid';
      const escrow0Data = {
        transactionType: this.homeInputService.DataInputHome.TypeOfTransation,
        role: this.homeInputService.DataInputHome.YourRole,
      };
      const escrow0LocalData = JSON.stringify(escrow0Data);
      localStorage.setItem(LOCAL_STORAGE_KEY, escrow0LocalData);
      setTimeout(() => {
        this.router.navigate(['/escrowstep1']);
      }, 1000);
    }
  }
}
