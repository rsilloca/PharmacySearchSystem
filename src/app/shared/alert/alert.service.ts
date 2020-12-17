import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from './alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private dialog: MatDialog) { }

  success(titulo?: string, mensaje?: string): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: {
        title: titulo || '¡Éxito!',
        message: mensaje || 'Acción realizada correctamente.',
        type: 'success'
      },
      panelClass: 'dialog-padding-0'
    });
  }

  error(titulo?: string, mensaje?: string): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: {
        title: titulo || '¡Error!',
        message: mensaje || 'Ha ocurrido un error inesperado.',
        type: 'error'
      },
      panelClass: 'dialog-padding-0'
    });
  }

  warnig(titulo?: string, mensaje?: string): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: {
        title: titulo || '¡Cuidado!',
        message: mensaje || 'Revisa paso a paso la acción que deseas realizar.',
        type: 'warning'
      },
      panelClass: 'dialog-padding-0'
    });
  }

  info(titulo?: string, mensaje?: string): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: {
        title: titulo || 'Información',
        message: mensaje || 'Estás olvidando algo.',
        type: 'info'
      },
      panelClass: 'dialog-padding-0'
    });
  }

}
