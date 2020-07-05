import { SettingsComponent } from './settings.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component:SettingsComponent,
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
export class SettingsRoutingModule { }
