import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from 'src/app/@models/producto';
import { ExcelService } from 'src/app/@services/excel.service';
import { ProductoService } from 'src/app/@services/producto.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'fury-subida-masiva',
  templateUrl: './subida-masiva.component.html',
  styleUrls: ['./subida-masiva.component.scss']
})
export class SubidaMasivaComponent implements OnInit {

  template: any = [{
    codigo: 'MF001',
    nombre: 'Paracetamol',
    marca: "Portugal",
    descripcion: "Paracetamol en tabletas de 5mg",
    fechaVencimiento: "12/01/2021",
    fracciones: 10,
    stock: 50,
    precioUnitario: 30.0
  }];

  file: any;
  arrayBuffer: any;
  filelist: any[];
  productos: Producto[] = [];

  form: FormGroup;

  constructor(private excelService: ExcelService, private productoService: ProductoService, private fb: FormBuilder,
    public dialogRef: MatDialogRef<SubidaMasivaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      idFarmacia: [null, Validators.required],
      idCategoria: [null, Validators.required],
      idFormaFarmaceutica: [null, Validators.required]
    });
  }

  downloadTemplateXLSX(): void {
    this.excelService.exportAsExcelFile(this.template, 'plantilla_subida_masiva');
  }

  subirExcel(event) {
    this.productos = [];
    this.file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      var arraylist: any[] = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.filelist = [];
      for (let index = 0; index < arraylist.length; index++) {
        this.productos.push(new Producto(arraylist[index]));
      }
    }
  }

  subirProductosMasivo() {
    if (this.form.invalid) return;
    for (let index = 0; index < this.productos.length; index++) {
      this.productos[index].idCategoria = this.form.controls['idCategoria'].value;
      this.productos[index].idFarmacia = this.form.controls['idFarmacia'].value;
      this.productos[index].idFormaFarmaceutica = this.form.controls['idFormaFarmaceutica'].value;
      this.productos[index].fechaVencimiento = new Date().toDateString();
    }
    console.log('subir fin', this.productos);
    this.dialogRef.close(this.productos);
  }

}
