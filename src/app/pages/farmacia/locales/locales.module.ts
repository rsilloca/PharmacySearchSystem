import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalesRoutingModule } from './locales-routing.module';
import { NuevoLocalComponent } from './nuevo-local/nuevo-local.component';


@NgModule({
  declarations: [NuevoLocalComponent],
  imports: [
    CommonModule,
    LocalesRoutingModule
  ]
})
export class LocalesModule { }
