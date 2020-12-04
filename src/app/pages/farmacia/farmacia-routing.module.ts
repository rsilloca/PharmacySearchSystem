import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ControlStockComponent } from './control-stock/control-stock.component';
import { ProductosComponent } from './productos/productos.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'locales',
    loadChildren: () => import('./locales/locales.module').then(m => m.LocalesModule)
  },
  {
    path: 'productos',
    component: ProductosComponent
  },
  {
    path: 'control-stock',
    component: ControlStockComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmaciaRoutingModule { }
