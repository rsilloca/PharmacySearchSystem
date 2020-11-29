import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DetallesProductoComponent } from './detalles-producto/detalles-producto.component';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {
  
  //dialog: any;

  filtroProducto: FormControl = new FormControl('');
  filtroOrden: FormControl = new FormControl(null);
  filtroGeneral: any;

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }
  selected = 'option3';

  filtrar($event: any) {
    this.filtroGeneral = $event;
    console.log('filtro recibido', $event);
  }

  filtrarProducto(): void {
    if (this.filtroProducto.invalid) {
      console.log('inválido');
      return;
    }
    console.log('buscando', this.filtroProducto.value);
  }


  abrirDetalles(): void {
    const dialog = this.dialog.open(DetallesProductoComponent, {
      width: '20rem',
      data: { titulo: 'Detalles Producto', mensaje: 'Probando' }
    });
    
  }

}
