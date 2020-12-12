import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PRECIO_MAXIMO_DEFAULT, PRECIO_MINIMO_DEFAULT, RADIO_DEFAULT } from 'src/app/@constants/constantes';
import { Categoria } from 'src/app/@models/categoria';
import { FormaFarmaceutica } from 'src/app/@models/formaFarmaceutica';
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
  presentaciones: FormaFarmaceutica[];
  formFiltro: FormGroup;

  constructor(private formBuilder: FormBuilder, private configuracionService: ConfiguracionService) { }

  ngOnInit(): void {
    this.listarCategorias();
    this.listarPresentaciones();
    this.formFiltro = this.formBuilder.group({
      radio: [RADIO_DEFAULT],
      categoria: [0],
      precioMinimo: [PRECIO_MINIMO_DEFAULT],
      precioMaximo: [PRECIO_MAXIMO_DEFAULT],
      presentacion: [0]
    });
    this.formFiltro.valueChanges.subscribe(changes => {
      this.eventFiltro.emit(this.formFiltro.value);
    });
  }

  enviarFiltro(): void {
    this.eventFiltro.emit(this.formFiltro.value);
  }

  listarCategorias() {
    this.configuracionService.getCategorias().subscribe(response => {
      this.categorias = response;
    }, error => {
      console.log('ha ocurrido un error al obtener categorias' + error);
    });
  }

  listarPresentaciones() {
    this.configuracionService.getFormasFarmaceuticas().subscribe(response => {
      this.presentaciones = response;
    });
  }

  formatLabelRadio(value: number) {
    if (value >= 1) {
      return value + 'm';
    }
    return value;
  }

  formatLabelPrecioMinimo(value: number) {
    if (value >= 1) {
      return 'S/.' + value;
    }
    return value;
  }

  formatLabelPrecioMaximo(value: number) {
    if (value >= 1) {
      return 'S/.' + value;
    }
    return value;
  }

}
