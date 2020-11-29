import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { MaterialComponentsModule } from 'src/@theming/shared/material-components.module';
import { FiltroComponent } from './busqueda/filtro/filtro.component';
import { SharedModule } from 'src/@theming/shared.module';


@NgModule({
  declarations: [BusquedaComponent, FiltroComponent],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    MaterialComponentsModule,
    SharedModule
  ]
})
export class PacienteModule { }
