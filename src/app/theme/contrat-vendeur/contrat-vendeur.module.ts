import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratVendeurRoutingModule } from './contrat-vendeur-routing.module';
import { ContratVendeurComponent } from './contrat-vendeur.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [ContratVendeurComponent],
  imports: [
    CommonModule,
    ContratVendeurRoutingModule,
    CollapseModule,
    MatIconModule 
  ]
})
export class ContratVendeurModule { }
