import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Farmacia } from 'src/app/@models/farmacia';
import { Producto } from 'src/app/@models/producto';

@Component({
  selector: 'fury-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.scss']
})
export class DetallesProductoComponent implements OnInit {

  // titulo: string = '';
  // nombreMedicamento: string = '';
  // marca: string = '';
  // nombreLab: string = '';
  // precio: string = '';
  // nombreFarmacia: string = '';
  // ubicacion: string = '';
  // distancia: string = '';
  // horario: string = '';
  producto: Producto;
  farmacia: Farmacia;

  constructor(public dialogRef: MatDialogRef<DetallesProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    // this.titulo = this.data.titulo;
    // this.nombreMedicamento = this.data.nombreMedicamento;
    // this.marca = this.data.marca;
    // this.nombreLab = this.data.nombreLab;
    // this.precio= this.data.precio;
    // this.nombreFarmacia = this.data.nombreFarmacia;
    // this.ubicacion = this.data.ubicacion;
    // this.distancia = this.data.distancia;
    // this.horario = this.data.horario;
    this.producto = this.data[0];
    this.farmacia = this.data[1];
  }

}
