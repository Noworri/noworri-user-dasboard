import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Authentification',
      status: false
    },
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./register/register.module').then(m => m.RegisterModule)
      },
      {
        path: 'funds',
        loadChildren: () =>
          import('./send-funds/send-funds.module').then(m => m.SendFundsModule)
      },
      {
        path: 'lock-screen',
        loadChildren: () =>
          import('./lock-screen/lock-screen.module').then(
            m => m.LockScreenModule
          )
      },
      {
        path: 'forgot',
        loadChildren: () =>
          import('./forgot/forgot.module').then(m => m.ForgotModule)
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
