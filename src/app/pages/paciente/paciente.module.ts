import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { FiltroComponent } from './busqueda/filtro/filtro.component';
import { DetallesProductoComponent } from './busqueda/detalles-producto/detalles-producto.component';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { VerRutaComponent } from './busqueda/ver-ruta/ver-ruta.component';
import { CambiarUbicacionComponent } from './cambiar-ubicacion/cambiar-ubicacion.component';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [BusquedaComponent, FiltroComponent, DetallesProductoComponent, VerRutaComponent, CambiarUbicacionComponent],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    MaterialModule,
    FurySharedModule,
    AgmCoreModule
  ]
})
export class PacienteModule { }
