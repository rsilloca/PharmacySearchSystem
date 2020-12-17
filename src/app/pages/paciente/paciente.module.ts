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
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { ItemBusquedaComponent } from './busqueda/item-busqueda/item-busqueda.component';
import { FiltroMobileComponent } from './busqueda/filtro-mobile/filtro-mobile.component';
import { FarmaciaBusquedaComponent } from './busqueda/farmacia-busqueda/farmacia-busqueda.component';


@NgModule({
  declarations: [BusquedaComponent, FiltroComponent, DetallesProductoComponent, VerRutaComponent, CambiarUbicacionComponent, ItemBusquedaComponent, FiltroMobileComponent, FarmaciaBusquedaComponent],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    MaterialModule,
    FurySharedModule,
    AgmCoreModule,
    FuryCardModule
  ]
})
export class PacienteModule { }
