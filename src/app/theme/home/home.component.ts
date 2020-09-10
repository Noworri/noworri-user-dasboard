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
  InputControl = 'custom-select ValidationColor';

  constructor(
    private homeInputService: HomeInputService,
    private router: Router
  ) {
    const sessionData = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!sessionData) {
      router.navigate(['auth/login'])
    }
  }

  ngOnInit() {}
  // ---Controle et envoi des donnees des champs, vers les objets du HomeInputService----------//
  OnSubmit(F: NgForm) {
    this.homeInputService.DataInputHome.TypeOfTransation =
      F.value['inputGroupSelect01'];
    this.homeInputService.DataInputHome.YourRole =
      F.value['inputGroupSelect02'];
      const escrow0Data = {
        transactionType: this.homeInputService.DataInputHome.TypeOfTransation,
        role: this.homeInputService.DataInputHome.YourRole,
      };
      const escrow0LocalData = JSON.stringify(escrow0Data);
      localStorage.setItem(LOCAL_STORAGE_KEY, escrow0LocalData);

    if (this.homeInputService.DataInputHome.TypeOfTransation === '') {
      this.InputControl = 'custom-select ValidationColor is-invalid';
    } else if (this.homeInputService.DataInputHome.YourRole === '') {
      this.InputControl = 'custom-select ValidationColor is-invalid';
    } else if (
      this.homeInputService.DataInputHome.TypeOfTransation === 'Merchandise' &&
      this.homeInputService.DataInputHome.YourRole === 'Buyer'
    ) {
      this.router.navigate(['/escrowmerchandisestep1']);
    } else if (
      this.homeInputService.DataInputHome.TypeOfTransation === 'Merchandise' &&
      this.homeInputService.DataInputHome.YourRole === 'Seller'
    ) {
      this.router.navigate(['/sellerescrowmerchandisestep1']);
    } else {
      this.InputControl = 'custom-select ValidationColor is-valid';
      setTimeout(() => {
        this.router.navigate(['/escrowservicesbuyersstep1']);
      }, 1000);
    }
  }
}
