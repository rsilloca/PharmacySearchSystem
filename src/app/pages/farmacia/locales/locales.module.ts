import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalesRoutingModule } from './locales-routing.module';
import { NuevoLocalComponent } from './nuevo-local/nuevo-local.component';
import { MaterialComponentsModule } from 'src/@theming/shared/material-components.module';
import { LocalesComponent } from './locales.component';
import { SharedModule } from 'src/@theming/shared.module';


@NgModule({
  declarations: [LocalesComponent, NuevoLocalComponent],
  imports: [
    CommonModule,
    LocalesRoutingModule,
    MaterialComponentsModule,
    SharedModule
  ]
})
export class LocalesModule { }
