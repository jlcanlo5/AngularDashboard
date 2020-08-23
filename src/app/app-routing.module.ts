import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages/pages.routing'
import { AuthRoutingModule } from './auth/auth.routing'

import { RouterModule, Route, Routes } from '@angular/router'
import { NopagefoundComponent } from './nopagefound/nopagefound.component'

const routes: Routes = [

  //path: 'dashboard' PagesRouting
  //path: 'login' AuthRouting
  {path: '', redirectTo: '/dashboard', pathMatch:'full'},
  {path: '**', component: NopagefoundComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
