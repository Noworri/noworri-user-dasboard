import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultPageRoutingModule } from './result-page-routing.module';
import { ResultPageComponent } from './result-page.component';
import {MatIconModule} from '@angular/material/icon';
import { DisputesRoutingModule } from '../disputes/dispute-routing.module';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ResultPageRoutingModule,
    MatIconModule,
    DisputesRoutingModule,
  ]
})
export class ResultPageModule { }
