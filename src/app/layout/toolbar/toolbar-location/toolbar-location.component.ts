import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CambiarUbicacionComponent } from 'src/app/pages/paciente/cambiar-ubicacion/cambiar-ubicacion.component';

@Component({
  selector: 'fury-toolbar-location',
  templateUrl: './toolbar-location.component.html',
  styleUrls: ['./toolbar-location.component.scss']
})
export class ToolbarLocationComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  abrirCambiarUbicacion(): void {
    const dialog = this.dialog.open(CambiarUbicacionComponent, {
      width: '30rem'
    });
  }

}
