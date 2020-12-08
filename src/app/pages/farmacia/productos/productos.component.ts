import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Categoria } from 'src/app/@models/categoria';
import { Farmacia } from 'src/app/@models/farmacia';
import { NuevoProductoComponent } from './nuevo-producto/nuevo-producto.component';
import { SubidaMasivaComponent } from './subida-masiva/subida-masiva.component';

// Tabla de productos
export interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  precio: number;
  marca: string;
  stock: number;
}

const ELEMENT_DATA: Producto[] = [
  { id: 1, codigo: 'MF001', nombre: 'Paracetamol', precio: 13, marca: 'Portugal', stock: 30 },
  { id: 2, codigo: 'MF002', nombre: 'Aspirina', precio: 15, marca: 'Forte', stock: 20 },
  { id: 3, codigo: 'MF003', nombre: 'Alcohol', precio: 20, marca: 'Mi farma', stock: 5 },
  { id: 4, codigo: 'MF004', nombre: 'Aciclovir', precio: 23, marca: 'Farma sur', stock: 3 },
  { id: 5, codigo: 'MF005', nombre: 'Pañales Babysec x64', precio: 65, marca: 'Babysec', stock: 10 },
  { id: 6, codigo: 'MF006', nombre: 'Jabon asepsia', precio: 5, marca: 'Asepsia', stock: 50 },
];

@Component({
  selector: 'fury-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  // TABLA
  displayedColumns: string[] = ['numero', 'codigo', 'nombre', 'precio', 'marca', 'stock', 'acciones'];
  dataSource = new MatTableDataSource<Producto>(ELEMENT_DATA);

  // Datos agregar producto
  farmacias: Farmacia[];
  categorias: Categoria[];
  

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  subidaMasiva(): void {
    let dialogUpload = this.dialog.open(SubidaMasivaComponent, {
      width: '30rem'
    });
  }

  nuevoProducto(producto?: Producto): void {
    let dialogProducto = this.dialog.open(NuevoProductoComponent, {
      width: '50rem'
    });
  }

}
