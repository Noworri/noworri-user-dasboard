import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EscrowStep2RoutingModule } from './escrow-step2-routing.module';
import { EscrowStep2Component } from './escrow-step2.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  // declarations: [EscrowStep2Component],
  imports: [
    CommonModule,
    EscrowStep2RoutingModule,
    MatIconModule
  ]
})
export class EscrowStep2Module { }
