import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formgetstrusted',
  templateUrl: './formgetstrusted.component.html',
  styleUrls: ['./formgetstrusted.component.scss']
})
export class FormgetstrustedComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  continueToIdentityVerication(){
    this.router.navigate(['identityverification'])
  }

}
