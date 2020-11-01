import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { BusquedaComponent } from './busqueda/busqueda.component';


@NgModule({
  declarations: [BusquedaComponent],
  imports: [
    CommonModule,
    PacienteRoutingModule
  ]
})
export class PacienteModule { }
