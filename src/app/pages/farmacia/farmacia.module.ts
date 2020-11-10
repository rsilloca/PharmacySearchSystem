import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmaciaRoutingModule } from './farmacia-routing.module';
import { LocalesComponent } from './locales/locales.component';
import { ProductosComponent } from './productos/productos.component';
import { ControlStockComponent } from './control-stock/control-stock.component';

@NgModule({
  declarations: [LocalesComponent, ProductosComponent, ControlStockComponent],
  imports: [
    CommonModule,
    FarmaciaRoutingModule
  ]
})
export class FarmaciaModule { }
