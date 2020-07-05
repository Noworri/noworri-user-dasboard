
import { Component, OnInit } from '@angular/core';



import { HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private router: Router) { }


  ngOnInit() {
  }
  //--------request a demo button---------//
  RequestAdemoButton(){
    window.location.href='https://share.hsforms.com/1797t-_4dRK-wQc3pTYyNUQ3ykgx'
  }

  //--------route to legale and security pages--------//
  RouteToLegaland(){
   this.router.navigate(['/privacy'])
  }
  redirectToSearch() {
    this.router.navigate([""]);
  }

  onWindowScroll(event) {

  }

}
