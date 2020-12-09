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

  constructor(public dialogRef: MatDialogRef<NuevoProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formProducto = this.fb.group({
      idFarmacia: [null, Validators.required],
      codigo: [""],
      nombre: ["", Validators.required],
      descripcion: ["", Validators.required],
      marca: [""],
      idCategoria: [null, Validators.required],
      idFormaFarmaceutica: [null, Validators.required],
      presentacion: [""],
      concentracion: [""],
      fechaVencimiento: [new Date(), Validators.required],
      fraccion: [0, Validators.required],
      stock: [0, Validators.required],
      precioUnitario: [0, Validators.required]
    });
  }

  guardarProducto() {
    let producto = new Producto(this.formProducto.value);
    this.dialogRef.close(producto);
  }

}
