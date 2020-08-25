import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-escrow-services-buyer-step2',
  templateUrl: './escrow-services-buyer-step2.component.html',
  styleUrls: ['./escrow-services-buyer-step2.component.scss']
})
export class EscrowServicesBuyerStep2Component implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  
  RoutingToTransation(){
    this.router.navigate(['/transactions'])
  }

}
