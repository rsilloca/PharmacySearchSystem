import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {

  @Input('expandableMultiple') expandableMultiple: boolean = false;
  @Output() eventFiltro = new EventEmitter<any>();

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'm';
    }
    return value;
  }

  formFiltro: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formFiltro = this.formBuilder.group({
      radio: new FormControl(50, [Validators.required]),
      categorias: new FormControl(null, [Validators.required]),
      precio: new FormControl(30, [Validators.required]),
      presentacion: new FormControl(null, [Validators.required])
    });
  }

  enviarFiltro(): void {
    let filtro = {
      radio: '30',
      categorias: 'Todos',
      precio: [10, 50],
      presentacion: 'blister'
    }
    this.eventFiltro.emit(filtro);
  }

}
