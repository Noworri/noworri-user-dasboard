import { EscrowStep1Component } from './escrow-step1.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EscrowStep1Component,
    data: {
      icon: 'icon-layout-sidebar-left',
      caption: '',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EscrowStep1RoutingModule { }
