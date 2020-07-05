import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiIntegrationComponent } from './api-integration.component';

const routes: Routes = [
  {
    path: '',
    component: ApiIntegrationComponent,
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
export class ApiIntegrationRoutingModule { }
