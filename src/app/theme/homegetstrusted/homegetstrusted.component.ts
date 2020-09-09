import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homegetstrusted',
  templateUrl: './homegetstrusted.component.html',
  styleUrls: ['./homegetstrusted.component.scss']
})
export class HomegetstrustedComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  routeToFormgetstruted(){
  this.router.navigate(['formgetstruted'])
  }

}
