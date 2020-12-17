import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Farmacia } from 'src/app/@models/farmacia';

@Component({
  selector: 'farmacia-busqueda',
  templateUrl: './farmacia-busqueda.component.html',
  styleUrls: ['./farmacia-busqueda.component.scss']
})
export class FarmaciaBusquedaComponent implements OnInit {

  @Input() farmacia: Farmacia;
  @Output() onVerRuta = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  subStr(text: string) {
    if (text.length > 15) {
      return text.substring(0, 14) + "...";
    }
    return text;
  }

}
