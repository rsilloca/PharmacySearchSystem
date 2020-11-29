import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {

  filtroProducto: FormControl = new FormControl('');
  filtroOrden: FormControl = new FormControl(null);
  filtroGeneral: any;

  constructor() { }

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

}
