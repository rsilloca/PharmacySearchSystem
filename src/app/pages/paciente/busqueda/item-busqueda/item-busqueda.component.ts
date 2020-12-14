import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { COLOR_5, ICONO_OTROS } from 'src/app/@constants/constantes';
import { Farmacia } from 'src/app/@models/farmacia';
import { Producto } from 'src/app/@models/producto';

@Component({
  selector: 'item-busqueda',
  templateUrl: './item-busqueda.component.html',
  styleUrls: ['./item-busqueda.component.scss']
})
export class ItemBusquedaComponent implements OnInit {

  @Input() background: string = COLOR_5;
  @Input() icon: string = ICONO_OTROS;
  @Input() producto: Producto;
  @Input() farmacia: Farmacia;
  @Output() onVerDetalles = new EventEmitter<any>();
  @Output() onVerRuta = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
