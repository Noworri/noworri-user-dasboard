import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-escrow-step2',
  templateUrl: './escrow-step2.component.html',
  styleUrls: ['./escrow-step2.component.scss']
})
export class EscrowStep2Component implements OnInit {

  constructor(private coo:Router) { }

  ngOnInit() {
  }
  
  re(){
    this.coo.navigate(['/contratacheteur'])
  }
}
