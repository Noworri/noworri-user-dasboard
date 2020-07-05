import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisputesRoutingModule } from './dispute-routing.module';
import { DisputesComponent } from './disputes.component';
import { SharedModule } from '../../shared/shared.module';
import { SelectModule } from 'ng-select';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DisputesRoutingModule,
    SharedModule,
    SelectModule
  ]
})
export class DisputesModule { }
