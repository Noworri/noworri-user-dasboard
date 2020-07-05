import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LockScreenRoutingModule } from './lock-screen-routing.module';
import { LockScreenComponent } from './lock-screen.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LockScreenComponent],
  imports: [
    CommonModule,
    LockScreenRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LockScreenModule { }
