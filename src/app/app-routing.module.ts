import { ResultPageComponent } from './theme/result-page/result-page.component';

import { PrivacyComponent } from './theme/privacy/privacy.component';
import { LandingPageComponent } from './theme/landing-page/landing-page.component';
import { SearchPageComponent } from './theme/search-page/search-page.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './layout/admin/admin.component';
import {AuthComponent} from './layout/auth/auth.component';




import { DisputPageComponent } from './theme/disput-page/disput-page.component';

const routes: Routes = [
  {
    path: "", redirectTo:"noworrisearch", pathMatch:"full"
  },
  {
    path: "",
    component: SearchPageComponent,
  },
  {
    path: "whatnoworri",
    component: LandingPageComponent,
  },
   {
     path:'privacy',
     component:PrivacyComponent,
   },
  {
    path: "noworrisearchresult/:phoneNumber",
    component: ResultPageComponent,
  //   children: [
  //     {path: 'disputepage', redirectTo: 'disputepage', pathMatch: 'full'},
  //       {
  //       path: "disputepage",
  //       component: DisputPageComponent
  //     },
  // ]
  },
  {
    path: "disputepage/:business",
    component: DisputPageComponent
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
