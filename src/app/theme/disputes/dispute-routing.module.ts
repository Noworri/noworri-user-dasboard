import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisputesComponent } from './disputes.component';

const routes: Routes = [
  {
    path: '',
    component: DisputesComponent,
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
export class DisputesRoutingModule { }
