import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from '../@services/authentication.service';
import { FiltroComponent } from '../pages/paciente/busqueda/filtro/filtro.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  showSide: boolean = false;
  pharmacyUser: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.pharmacyUser = this.authService.isPharmacyUser();
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public openFilter() {
    this.dialog.open(FiltroComponent, {
      panelClass: 'filtro-modal'
    });
  }

}
