import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'fury-eliminar-confirmacion',
  templateUrl: './eliminar-confirmacion.component.html',
  styleUrls: ['./eliminar-confirmacion.component.scss']
})
export class EliminarConfirmacionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EliminarConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
  }

}
