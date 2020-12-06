import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './@guards/auth.guard';
import { LoginGuard } from './@guards/login.guard';
import { PatientGuard } from './@guards/patient.guard';
import { PharmacyGuard } from './@guards/pharmacy.guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [LoginGuard],
    loadChildren: () => import('./pages/authentication/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'register',
    canActivate: [LoginGuard],
    loadChildren: () => import('./pages/authentication/register/register.module').then(m => m.RegisterModule),
  },
  {
    path: 'forgot-password',
    canActivate: [LoginGuard],
    loadChildren: () => import('./pages/authentication/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivate: [PatientGuard],
        loadChildren: () => import('./pages/paciente/paciente.module').then(m => m.PacienteModule),
        pathMatch: 'full'
      },
      {
        path: 'pharmacy',
        canActivate: [PharmacyGuard],
        loadChildren: () => import('./pages/farmacia/farmacia.module').then(m => m.FarmaciaModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
