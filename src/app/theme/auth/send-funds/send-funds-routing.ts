import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendFundsComponent } from './send-funds.component';

const routes: Routes = [
  {
    path: '',
    component: SendFundsComponent,
    data: {
      title: 'Funds'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendFundsRoutingModule { }
