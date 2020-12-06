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
      width: '20rem',
      data: {
        title: titulo || '¡Éxito!',
        message: mensaje || 'Acción realizada correctamente.',
        type: 'success'
      }
    });
  }

  error(titulo?: string, mensaje?: string): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '20rem',
      data: {
        title: titulo || '¡Error!',
        message: mensaje || 'Ha ocurrido un error inesperado.',
        type: 'error'
      }
    });
  }

  warnig(titulo?: string, mensaje?: string): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '20rem',
      data: {
        title: titulo || '¡Cuidado!',
        message: mensaje || 'Revisa paso a paso la acción que deseas realizar.',
        type: 'warning'
      }
    });
  }

  info(titulo?: string, mensaje?: string): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '20rem',
      data: {
        title: titulo || 'Información',
        message: mensaje || 'Estás olvidando algo.',
        type: 'info'
      }
    });
  }

}
