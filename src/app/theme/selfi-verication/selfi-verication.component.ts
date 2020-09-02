import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selfi-verication',
  templateUrl: './selfi-verication.component.html',
  styleUrls: ['./selfi-verication.component.scss']
})
export class SelfiVericationComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  routeToRecapGetStrusted(){
    this.router.navigate(['recapgetstruted'])
  }

}
