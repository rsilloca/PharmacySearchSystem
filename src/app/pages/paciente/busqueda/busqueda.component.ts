import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatGridList } from '@angular/material/grid-list';
import { COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, ICONO_ADULTO_MAYOR, ICONO_CUIDADO_BUCAL, ICONO_CUIDADO_PERSONAL, ICONO_INFANTIL, ICONO_OTROS, PRECIO_MAXIMO_DEFAULT, PRECIO_MINIMO_DEFAULT, RADIO_DEFAULT, TYPE_LOCATION_AUTOMATIC, TYPE_LOCATION_MANUAL } from 'src/app/@constants/constantes';
import { Farmacia } from 'src/app/@models/farmacia';
import { FilterObserver } from 'src/app/@models/filter-observer';
import { FilterSubject } from 'src/app/@models/filter-subject';
import { FiltroProductos } from 'src/app/@models/filtro-productos';
import { Producto } from 'src/app/@models/producto';
import { FilterObserverService } from 'src/app/@services/filter-observer.service';
import { ProductoService } from 'src/app/@services/producto.service';
import { UsuarioService } from 'src/app/@services/usuario.service';
import { SpinnerService } from 'src/app/shared/spinner.service';
import { DetallesProductoComponent } from './detalles-producto/detalles-producto.component';
import { VerRutaComponent } from './ver-ruta/ver-ruta.component';

@Component({
  selector: 'fury-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit, FilterObserver {

  filtro: FormGroup;
  filtroAvanzado: any = {
    radio: RADIO_DEFAULT,
    categoria: 0,
    precioMinimo: PRECIO_MINIMO_DEFAULT,
    precioMaximo: PRECIO_MAXIMO_DEFAULT,
    presentacion: 0
  };
  productos: any[] = [];
  selected = 'option3';

  // Componentes
  @ViewChild('gridProductos') gridProductos: MatGridList;
  gridByBreakpoint: any = [
    { xl: 6, lg: 4, md: 3, sm: 3, xs: 1 }
  ];

  iconos = [
    ICONO_ADULTO_MAYOR,
    ICONO_CUIDADO_BUCAL,
    ICONO_CUIDADO_PERSONAL,
    ICONO_INFANTIL,
    ICONO_OTROS
  ];

  colores = [
    COLOR_1,
    COLOR_2,
    COLOR_3,
    COLOR_4,
    COLOR_5
  ]

  constructor(private dialog: MatDialog, private mediaObserver: MediaObserver, private fb: FormBuilder,
    private productoService: ProductoService, private userService: UsuarioService,
    private spinnerService: SpinnerService, private filterObserverService: FilterObserverService) { }

  update(subject: FilterSubject): void {
    let filtro = JSON.parse(localStorage.getItem('filtro'));
    console.log( 'filtro recibido', filtro)
    this.filtroAvanzado = filtro;
    this.filtrarProductos();
  }

  ngOnInit(): void {
    this.filterObserverService.subscribe(this);
    this.filtro = this.fb.group({
      nombre: [''],
      orden: [0]
    });
    // this.filtrarProductos();
  }

  ngAfterContentInit(): void {
    this.mediaObserver.asObservable().subscribe((changes: MediaChange[]) => {
      if (this.gridProductos == undefined) return;
      this.gridProductos.cols = this.gridByBreakpoint[0][changes[0].mqAlias];
    });
  }

  filtrar($event: any) {
    this.filtroAvanzado = $event;
    // this.filtrarProductos();
  }

  filtrarProductos(): void {
    let spinner = this.spinnerService.start('Buscando...');
    let filtro = new FiltroProductos(this.filtroAvanzado);
    filtro.nombre = this.filtro.controls['nombre'].value;
    filtro.ordenamiento = this.filtro.controls['orden'].value;
    filtro.regxpag = 12;
    let typeLocation = this.userService.getTypeLocation();
    if (+typeLocation == TYPE_LOCATION_MANUAL) {
      let location = this.userService.getLocation();
      filtro.latitud = location[0];
      filtro.longitud = location[1];
      this.buscarProductos(spinner, filtro);
    } else {
      this.userService.getNavigatorGeolocation().then(locationUser => {
        filtro.latitud = locationUser.latitud;
        filtro.longitud = locationUser.longitud;
        this.buscarProductos(spinner, filtro);
      });
    }
  }

  buscarProductos(spinner: any, filtro: FiltroProductos) {
    this.productoService.getProductos(filtro).subscribe(response => {
      this.productos = [];
      response.data.forEach((farmacia: Farmacia) => {
        farmacia.productos.forEach((producto: Producto) => {
          this.productos.push([producto, farmacia]);
        });
      });
      if (response.count > 0) this.gridProductos.rowHeight = '16rem';
      else this.gridProductos.rowHeight = '0';
      this.spinnerService.stop(spinner);
    }, error => {
      console.log('ocurrio un error', error);
    });
  }

  abrirDetalles(): void {
    const dialog = this.dialog.open(DetallesProductoComponent, {
      width: '30rem',
      data: {
        titulo: 'Detalles de búsqueda', nombreMedicamento: 'Ibuprofeno 800mg.- TABLETA',
        marca: 'Blister x100 uni.', nombreLab: 'FARMAINDUSTRIA', precio: 'S/.20.00',
        nombreFarmacia: 'Inkafarma Ejercito - Inkafarma', ubicacion: 'Av. Ejercito 123 ',
        distancia: 'A 0.5km. aproximadamente', horario: 'Atiende de 9:00hrs a 18:00hrs'
      }
    });
  }

  abrirVerRuta(): void {
    const dialog = this.dialog.open(VerRutaComponent, {
      width: '30rem'
    });
  }

  getIcon(idCategoria: number) {
    return this.iconos[idCategoria - 1];
  }

  getColor(idCategoria: number) {
    return this.colores[idCategoria - 1];
  }

}
