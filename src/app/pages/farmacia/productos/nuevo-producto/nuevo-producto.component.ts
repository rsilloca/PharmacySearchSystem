import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from 'src/app/@models/categoria';
import { FormaFarmaceutica } from 'src/app/@models/formaFarmaceutica';
import { Producto } from 'src/app/@models/producto';

@Component({
  selector: 'fury-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.scss']
})
export class NuevoProductoComponent implements OnInit {

  formProducto: FormGroup;
  editar: boolean = false;
  producto: Producto;

  constructor(public dialogRef: MatDialogRef<NuevoProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.producto = this.data.producto;
    this.editar = this.producto ? true : false;
    this.formProducto = this.fb.group({
      idFarmacia: [this.editar ? this.producto.idFarmacia : null, Validators.required],
      codigo: [this.editar ? this.producto.codigo : ""],
      nombre: [this.editar ? this.producto.nombre : "", Validators.required],
      descripcion: [this.editar ? this.producto.descripcion : "", Validators.required],
      marca: [this.editar ? this.producto.marca : ""],
      idCategoria: [this.editar ? this.producto.idCategoria : null, Validators.required],
      idFormaFarmaceutica: [this.editar ? this.producto.idFormaFarmaceutica : null, Validators.required],
      fechaVencimiento: [this.editar ? this.producto.fechaVencimiento : new Date(), Validators.required],
      fraccion: [this.editar ? this.producto.fraccion : 0, Validators.required],
      stock: [this.editar ? this.producto.stock : 0, Validators.required],
      precioUnitario: [this.editar ? this.producto.precioUnitario : 0, Validators.required]
    });
  }

  guardarProducto() {
    if (this.formProducto.invalid) return;
    let producto = new Producto(this.formProducto.value);
    producto.idProducto = this.editar ? this.producto.idProducto : 0;
    this.dialogRef.close(producto);
  }

}
