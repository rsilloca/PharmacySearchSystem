import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TYPE_PATIENT } from 'src/app/@constants/constantes';
import { UsuarioService } from 'src/app/@services/usuario.service';
import { CambiarUbicacionComponent } from 'src/app/pages/paciente/cambiar-ubicacion/cambiar-ubicacion.component';

@Component({
  selector: 'fury-toolbar-location',
  templateUrl: './toolbar-location.component.html',
  styleUrls: ['./toolbar-location.component.scss']
})
export class ToolbarLocationComponent implements OnInit {

  constructor(private dialog: MatDialog, private userService: UsuarioService) { }

  ngOnInit(): void {
    // if (+this.userService.getRol() == TYPE_PATIENT) {
    //   this.abrirCambiarUbicacion();
    // }
  }

  abrirCambiarUbicacion(): void {
    const dialog = this.dialog.open(CambiarUbicacionComponent, {
      width: '40rem',
      disableClose: true
    });
  }

}
