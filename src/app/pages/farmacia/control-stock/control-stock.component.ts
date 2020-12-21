import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatGridList } from '@angular/material/grid-list';
import { Categoria } from 'src/app/@models/categoria';
import { Farmacia } from 'src/app/@models/farmacia';
import { FiltroLocales } from 'src/app/@models/filtro-locales';
import { FiltroProductos } from 'src/app/@models/filtro-productos';
import { FormaFarmaceutica } from 'src/app/@models/formaFarmaceutica';
import { Producto } from 'src/app/@models/producto';
import { ConfiguracionService } from 'src/app/@services/configuracion.service';
import { FarmaciaService } from 'src/app/@services/farmacia.service';
import { ProductoService } from 'src/app/@services/producto.service';
import { UsuarioService } from 'src/app/@services/usuario.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { SpinnerService } from 'src/app/shared/spinner.service';

@Component({
  selector: 'fury-control-stock',
  templateUrl: './control-stock.component.html',
  styleUrls: ['./control-stock.component.scss']
})
export class ControlStockComponent implements OnInit {

  // Componentes
  @ViewChild('gridProductos') gridProductos: MatGridList;
  gridByBreakpoint: any = [
    { xl: 4, lg: 3, md: 3, sm: 2, xs: 2 }
  ];

  // Filtro
  farmacias: Farmacia[] = [];
  categorias: Categoria[] = [];
  formasFarmaceuticas: FormaFarmaceutica[] = [];
  productoDesc: string = '';
  formFiltro: FormGroup;

  // Variables
  productos: Producto[] = [];
  productosSeleccionados: Producto[] = [];

  // Paginado
  totalDatos: number = 0;
  regxpag = 12;
  page: number = 0;

  constructor(private mediaObserver: MediaObserver, private fb: FormBuilder,
    private farmaciaService: FarmaciaService, private userService: UsuarioService,
    private configuracionService: ConfiguracionService, private productoService: ProductoService,
    private spinnerService: SpinnerService, private alertService: AlertService) { }

  ngAfterContentInit(): void {
    this.mediaObserver.asObservable().subscribe((changes: MediaChange[]) => {
      this.gridProductos.cols = this.gridByBreakpoint[0][changes[0].mqAlias];
    });
  }

  ngOnInit(): void {
    this.getFarmacias();
    this.getCategorias();
    this.getFormasFarmaceuticas();
    this.formFiltro = this.fb.group({
      idFarmacia: [null],
      categoria: [null],
      presentacion: [null],
      nombre: ['']
    });
  }

  seleccionarProducto(producto: Producto): void {
    if (this.productosSeleccionados.findIndex((p: Producto) => p.idProducto == producto.idProducto) < 0) {
      this.productosSeleccionados.push(new Producto(producto));
    }
  }

  eliminarProductoSeleccionado(producto: Producto): void {
    let index = this.productosSeleccionados.findIndex((p: Producto) => p.idProducto == producto.idProducto);
    if (index >= 0) {
      this.productosSeleccionados.splice(index, 1);
    }
  }

  getFarmacias() {
    let filtro = new FiltroLocales();
    filtro.idUsuario = +this.userService.getIdUsuario();
    filtro.pagina = 0;
    filtro.regxpag = 1000;
    filtro.radio = 1000000000;
    this.farmaciaService.getFarmaciaFiltros(filtro).subscribe(respFarmacias => {
      this.farmacias = (respFarmacias as any).data;
    });
  }

  getCategorias() {
    this.configuracionService.getCategorias().subscribe(respCategorias => {
      this.categorias = respCategorias;
    });
  }

  getFormasFarmaceuticas() {
    this.configuracionService.getFormasFarmaceuticas().subscribe(respFormas => {
      this.formasFarmaceuticas = respFormas;
    });
  }

  getProductos() {
    let spinner = this.spinnerService.start('Buscando...');
    let filtro = new FiltroProductos(this.formFiltro.value);
    filtro.radio = 10000000000;
    filtro.pagina = this.page;
    filtro.regxpag = this.regxpag;
    this.productoService.getProductos(filtro).subscribe(response => {
      this.spinnerService.stop(spinner);
      this.productos = response.count > 0 ? response.data[0].productos : [];
      this.totalDatos = response.count;
      if (this.totalDatos > 0) this.gridProductos.rowHeight = '8rem';
      else this.gridProductos.rowHeight = '0';
    }, error => {
      this.spinnerService.stop(spinner);
      this.alertService.error();
    });
  }

  actualizarStock() {
    let spinner = this.spinnerService.start('Actualizando...');
    console.log('actualzar');
    this.productoService.updateProductos(this.productosSeleccionados).subscribe(response => {
      console.log('update success');
      this.productosSeleccionados = [];
      this.productos = [];
      this.gridProductos.rowHeight = '0';
      this.spinnerService.stop(spinner);
      this.alertService.success('¡Éxito!', 'El stock se actualizó correctamente.');
    }, error => {
      this.spinnerService.stop(spinner);
      this.alertService.error('¡Error!', 'No se pudo actualizar el stock.');
    });
  }
  onPageChange($event) {
    this.page = $event.pageIndex;
    this.getProductos();
  }

}
