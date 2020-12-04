import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmaciaRoutingModule } from './farmacia-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ControlStockComponent } from './control-stock/control-stock.component';
import { ProductosComponent } from './productos/productos.component';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { NuevoProductoComponent } from './productos/nuevo-producto/nuevo-producto.component';
import { SubidaMasivaComponent } from './productos/subida-masiva/subida-masiva.component';


@NgModule({
  declarations: [DashboardComponent, ControlStockComponent, ProductosComponent, NuevoProductoComponent, SubidaMasivaComponent],
  imports: [
    CommonModule,
    FarmaciaRoutingModule,
    MaterialModule,
    FurySharedModule
  ]
})
export class FarmaciaModule { }
