import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PRECIO_MAXIMO_DEFAULT, PRECIO_MINIMO_DEFAULT, RADIO_DEFAULT } from 'src/app/@constants/constantes';
import { Categoria } from 'src/app/@models/categoria';
import { FormaFarmaceutica } from 'src/app/@models/formaFarmaceutica';

@Component({
  selector: 'fury-filtro-mobile',
  templateUrl: './filtro-mobile.component.html',
  styleUrls: ['./filtro-mobile.component.scss']
})

export class FiltroMobileComponent implements OnInit {

  categorias: Categoria[];
  presentaciones: FormaFarmaceutica[];
  formFiltro: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.categorias = this.data.categorias;
    this.presentaciones = this.data.presentaciones;
    let filtro = localStorage.getItem('filtro');
    if (filtro) {
      this.formFiltro = this.fb.group(JSON.parse(filtro));
    } else {
      this.formFiltro = this.fb.group({
        radio: [RADIO_DEFAULT],
        categoria: [0],
        precioMinimo: [PRECIO_MINIMO_DEFAULT],
        precioMaximo: [PRECIO_MAXIMO_DEFAULT],
        presentacion: [0]
      });
    }
  }

  formatLabelRadio(value: number) {
    if (value >= 1000) {
      value = value / 1000;
      return Math.round(value * 10) / 10 + 'km';
    }
    return value + 'm';
  }

  formatLabelPrecioMinimo(value: number) {
    return 'S/' + value;
  }

  formatLabelPrecioMaximo(value: number) {
    return 'S/' + value;
  }

}
