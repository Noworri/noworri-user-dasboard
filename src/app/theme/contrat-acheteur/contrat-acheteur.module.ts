import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratAcheteurRoutingModule } from './contrat-acheteur-routing.module';
import { ContratAcheteurComponent } from './contrat-acheteur.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [ContratAcheteurComponent],
  imports: [
    CommonModule,
    ContratAcheteurRoutingModule,
    CollapseModule,
    MatIconModule
  ]
})
export class ContratAcheteurModule { }
