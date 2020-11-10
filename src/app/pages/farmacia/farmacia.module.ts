import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmaciaRoutingModule } from './farmacia-routing.module';
import { ProductosComponent } from './productos/productos.component';
import { ControlStockComponent } from './control-stock/control-stock.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialComponentsModule } from 'src/@theming/shared/material-components.module';
import { SharedModule } from 'src/@theming/shared.module';

@NgModule({
  declarations: [DashboardComponent, ProductosComponent, ControlStockComponent],
  imports: [
    CommonModule,
    FarmaciaRoutingModule,
    MaterialComponentsModule,
    SharedModule
  ]
})
export class FarmaciaModule { }
