import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/@services/usuario.service';
import { MiPerfilComponent } from 'src/app/pages/authentication/mi-perfil/mi-perfil.component';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { SpinnerService } from 'src/app/shared/spinner.service';

@Component({
  selector: 'fury-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss']
})
export class ToolbarUserComponent implements OnInit {

  isOpen: boolean;

  constructor(private router: Router,
    private userService: UsuarioService, private dialog: MatDialog,
    private alertService: AlertService, private spinnerService: SpinnerService) { }

  ngOnInit() {
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  verPerfil() {
    let spinner = this.spinnerService.start('Cargando...');
    let idUser = this.userService.getIdUsuario();
    let dialog;
    this.userService.getUsuario(+idUser).subscribe(usuario => {
      this.spinnerService.stop(spinner);
      dialog = this.dialog.open(MiPerfilComponent, {
        width: '35rem',
        data: usuario
      });
      dialog.afterClosed().subscribe(response => {
        if (response) {
          let spinnerUpdate = this.spinnerService.start('Actualizando datos...');
          this.userService.updateUsuario(response).subscribe(success => {
            this.spinnerService.stop(spinnerUpdate);
            this.alertService.success('¡Éxito!', 'Datos actualizados correctamente.');
          }, error => {
            this.spinnerService.stop(spinnerUpdate);
            this.alertService.error('Error', 'No se pudo actualizar los datos.');
          });
        }
      });
    }, error => {
      this.spinnerService.stop(spinner);
      this.alertService.error();
    });
  }

}
