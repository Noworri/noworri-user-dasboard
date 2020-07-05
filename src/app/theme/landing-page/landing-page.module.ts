import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { AppModule } from 'src/app/app.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    AppModule,
  ]
})
export class LandingPageModule { }
