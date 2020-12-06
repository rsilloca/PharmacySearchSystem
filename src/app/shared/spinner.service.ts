import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpinnerComponent } from './spinner/spinner.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private dialog: MatDialog) { }

  start(message?): MatDialogRef<SpinnerComponent> {
    const dialogRef = this.dialog.open(SpinnerComponent, {
      disableClose: true,
      data: message == '' || message == undefined ? "Cargando..." : message
    });
    return dialogRef;
  };

  stop(ref: MatDialogRef<SpinnerComponent>) {
    ref.close();
  }

}
