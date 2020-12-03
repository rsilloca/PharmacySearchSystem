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
      width: '25rem',
      data: { titulo: 'Detalles de búsqueda', nombreMedicamento: 'Ibuprofeno 800mg.- TABLETA', 
      marca:'Blister x100 uni.', nombreLab:'FARMAINDUSTRIA', precio:'S/.20.00',
      nombreFarmacia:'Inkafarma Ejercito - Inkafarma', ubicacion:'Av. Ejercito 123 ',
       distancia:'A 0.5km. aproximadamente', horario:'Atiende de 9:00hrs a 18:00hrs'}
    });
    
  }

}
