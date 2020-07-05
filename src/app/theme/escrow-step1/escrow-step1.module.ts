import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EscrowStep1RoutingModule } from './escrow-step1-routing.module';
import { EscrowStep1Component } from './escrow-step1.component';
import { SharedModule } from '../../shared/shared.module';
import { SelectModule } from 'ng-select';
import {MatCardModule} from '@angular/material/card'; 
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatRadioModule} from '@angular/material/radio'; 


@NgModule({
  declarations: [EscrowStep1Component],
  imports: [
    CommonModule,
    EscrowStep1RoutingModule,
    SharedModule, 
    SelectModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EscrowStep1Module { }
