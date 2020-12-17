import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterPharmacyComponent } from './register-pharmacy.component';


const routes: Routes = [
  {
    path: '',
    component: RegisterPharmacyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterPharmacyRoutingModule { }
