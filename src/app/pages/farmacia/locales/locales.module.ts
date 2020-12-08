import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalesRoutingModule } from './locales-routing.module';
import { LocalesComponent } from './locales.component';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { AgmCoreModule } from '@agm/core';
import { NuevoLocalComponent } from './nuevo-local/nuevo-local.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [LocalesComponent, NuevoLocalComponent],
  imports: [
    CommonModule,
    LocalesRoutingModule,
    MaterialModule,
    FurySharedModule,
    AgmCoreModule,
    SharedModule
  ]
})
export class LocalesModule { }
