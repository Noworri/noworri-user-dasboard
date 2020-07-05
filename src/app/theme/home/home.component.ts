import { Router } from '@angular/router'
import { HomeInputService } from './../../Service/home-input.service'

import { Component, OnInit } from '@angular/core'
import { from } from 'rxjs'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  InputControl = 'custom-select ValidationColor'

  constructor (
    private HomeInputService: HomeInputService,
    private Router: Router
  ) {}

  ngOnInit () {}
  //---Controle et envoi des donnees des champs, vers les objets du HomeInputService----------//
  OnSubmit (F: NgForm) {
    this.HomeInputService.DataInputHome.TypeOfTransation =
      F.value['inputGroupSelect01']
    this.HomeInputService.DataInputHome.YourRole = F.value['inputGroupSelect02']
    if (this.HomeInputService.DataInputHome.TypeOfTransation == '') {
      this.InputControl = 'custom-select ValidationColor is-invalid'
    } else if (this.HomeInputService.DataInputHome.YourRole == '') {
      this.InputControl = 'custom-select ValidationColor is-invalid'
    } else {
      this.InputControl = 'custom-select ValidationColor is-valid'
      setTimeout(() => {
        this.Router.navigate(['/escrowstep1'])
      }, 1000)
    }
  }
}
