import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { HomegetstrustedComponent } from './homegetstrusted.component';

const  Route = [
  {
    path: '',
    component: HomegetstrustedComponent,
    data: {
      icon: 'icon-layout-sidebar-left',
      caption: '',
      status: true
    }
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class HomegetstrustedModule { }
