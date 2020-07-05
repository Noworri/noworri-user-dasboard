import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DisputPageRoutingModule } from './disput-page-routing.module';
import { DisputPageComponent } from './disput-page.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DisputPageRoutingModule,
    MatIconModule
  ]
})
export class DisputPageModule { }
