import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { MaterialComponentsModule } from 'src/@theming/shared/material-components.module';


@NgModule({
  declarations: [BusquedaComponent],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    MaterialComponentsModule
  ]
})
export class PacienteModule { }
