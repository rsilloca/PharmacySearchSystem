import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { MaterialComponentsModule } from 'src/@theming/shared/material-components.module';
import { FiltroComponent } from './busqueda/filtro/filtro.component';
import { SharedModule } from 'src/@theming/shared.module';
import { DetallesProductoComponent } from './busqueda/detalles-producto/detalles-producto.component';


@NgModule({
  declarations: [BusquedaComponent, FiltroComponent, DetallesProductoComponent],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    MaterialComponentsModule,
    SharedModule
  ]
})
export class PacienteModule { }
