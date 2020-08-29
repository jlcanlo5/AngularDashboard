import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'

import { AppRoutingModule } from '../app-routing.module';
import { PagesRoutingModule } from './pages.routing'

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';

//Importar ngSelect
import { NgSelectModule } from '@ng-select/ng-select';
import { Grafica2Component } from './grafica2/grafica2.component';
import { BarrasComponent } from './barras/barras.component';
import { MultipleComponent } from './multiple/multiple.component';
import { FiltrosComponent } from './filtros/filtros.component';
import { MesesComponent } from './meses/meses.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    Grafica2Component,
    BarrasComponent,
    MultipleComponent,
    FiltrosComponent,
    MesesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ChartsModule,
    NgSelectModule,
    FormsModule,
    AppRoutingModule,
    PagesRoutingModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ]
})
export class PagesModule { }
