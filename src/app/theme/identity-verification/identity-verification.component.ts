import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-identity-verification',
  templateUrl: './identity-verification.component.html',
  styleUrls: ['./identity-verification.component.scss']
})
export class IdentityVerificationComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  routeToSelfiVerification(){
       this.router.navigate(['selfiverification'])
  }

}
