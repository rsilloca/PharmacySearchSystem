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
import { ListModule } from 'src/@fury/shared/list/list.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { QuickInfoWidgetModule } from '../dashboard/widgets/quick-info-widget/quick-info-widget.module';
import { ItemCarritoComponent } from './control-stock/item-carrito/item-carrito.component';
import { LoadingOverlayModule } from 'src/@fury/shared/loading-overlay/loading-overlay.module';


@NgModule({
  declarations: [DashboardComponent, ControlStockComponent, ProductosComponent, NuevoProductoComponent, SubidaMasivaComponent, ItemCarritoComponent],
  imports: [
    CommonModule,
    FarmaciaRoutingModule,
    MaterialModule,
    FurySharedModule,
    ListModule,
    FuryCardModule,
    QuickInfoWidgetModule,
    LoadingOverlayModule
  ]
})
export class FarmaciaModule { }
