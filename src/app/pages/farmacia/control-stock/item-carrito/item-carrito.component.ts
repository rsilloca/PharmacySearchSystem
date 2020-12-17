import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Producto } from 'src/app/@models/producto';

@Component({
  selector: 'item-carrito',
  templateUrl: './item-carrito.component.html',
  styleUrls: ['./item-carrito.component.scss']
})
export class ItemCarritoComponent implements OnInit {

  @Input('item') item: Producto;
  @Output() onEliminar = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
