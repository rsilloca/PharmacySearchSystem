import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalesComponent } from './locales.component';
import { NuevoLocalComponent } from './nuevo-local/nuevo-local.component';


const routes: Routes = [
  {
    path: '',
    component: LocalesComponent
  },
  {
    path: 'local',
    component: NuevoLocalComponent
  },
  {
    path: 'local/:id',
    component: NuevoLocalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalesRoutingModule { }
