import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetallesProductoComponent } from './detalles-producto/detalles-producto.component';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {
  
  //dialog: any;

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }
  selected = 'option3';

  abrirDetalles(): void {
    const dialog = this.dialog.open(DetallesProductoComponent, {
      width: '20rem',
      data: { titulo: 'Detalles Producto', mensaje: 'Probando' }
    });
    
  }

}
