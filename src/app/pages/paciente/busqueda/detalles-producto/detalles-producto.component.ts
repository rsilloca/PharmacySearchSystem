import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.scss']
})
export class DetallesProductoComponent implements OnInit {

  titulo: string = '';
  mensaje: string = '';

  constructor(public dialogRef: MatDialogRef<DetallesProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.titulo = this.data.titulo;
    this.mensaje = this.data.mensaje;
  }



}
