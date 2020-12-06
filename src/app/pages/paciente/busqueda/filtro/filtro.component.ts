import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/@models/categoria';
import { ConfiguracionService } from 'src/app/@services/configuracion.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {

  @Input('expandableMultiple') expandableMultiple: boolean = false;
  @Output() eventFiltro = new EventEmitter<any>();
  categorias: Categoria[];

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'm';
    }
    return value;
  }

  formFiltro: FormGroup;

  constructor(private formBuilder: FormBuilder, private configuracionService: ConfiguracionService) { }

  ngOnInit(): void {
    this.listarCategorias();
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

  listarCategorias() {
    this.configuracionService.getCategorias().subscribe(response => {
      console.log("respuesta categorias", response);
      this.categorias = response;
    }, error => {
      console.log('ha ocurrido un error al obtener categorias' + error);
    });
  }

}
