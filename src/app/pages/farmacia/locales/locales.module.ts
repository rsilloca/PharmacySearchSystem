import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalesRoutingModule } from './locales-routing.module';
import { LocalesComponent } from './locales.component';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { AgmCoreModule } from '@agm/core';
import { NuevoLocalComponent } from './nuevo-local/nuevo-local.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';


@NgModule({
  declarations: [LocalesComponent, NuevoLocalComponent],
  imports: [
    CommonModule,
    LocalesRoutingModule,
    MaterialModule,
    FurySharedModule,
    AgmCoreModule,
    SharedModule,
    ListModule,
    FuryCardModule
  ]
})
export class LocalesModule { }
