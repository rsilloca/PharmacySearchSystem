import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterPharmacyRoutingModule } from './register-pharmacy-routing.module';
import { RegisterPharmacyComponent } from './register-pharmacy.component';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RegisterPharmacyComponent],
  imports: [
    CommonModule,
    RegisterPharmacyRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class RegisterPharmacyModule { }
