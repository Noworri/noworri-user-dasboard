import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiIntegrationRoutingModule } from './apit-integration-routing.module';
import { ApiIntegrationComponent } from './api-integration.component';
import { SharedModule } from '../../shared/shared.module';
import { SelectModule } from 'ng-select';

@NgModule({
  // declarations: [ApiIntegrationComponent],
  imports: [
    CommonModule,
    ApiIntegrationRoutingModule,
    SharedModule, 
    SelectModule
  ]
})
export class ApiIntegrationModule { }
