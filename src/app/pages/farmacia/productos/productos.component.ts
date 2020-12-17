import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
import { NuevoProductoComponent } from './nuevo-producto/nuevo-producto.component';
import { SubidaMasivaComponent } from './subida-masiva/subida-masiva.component';
@Component({
  selector: 'fury-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  // TABLA
  displayedColumns: string[] = ['numero', 'codigo', 'nombre', 'precio', 'marca', 'stock', 'acciones'];

  // Datos agregar producto
  farmacias: Farmacia[];
  categorias: Categoria[];
  formasFarmaceuticas: FormaFarmaceutica[];
  productos: Producto[] = []; // new MatTableDataSource<Producto>([]);

  formFiltro: FormGroup;
  totalDatos: number = 0;
  pagina: number = 0;
  regxpag: number = 10;

  constructor(private dialog: MatDialog,
    private farmaciaService: FarmaciaService,
    private configuracionService: ConfiguracionService,
    private usuarioService: UsuarioService,
    private productoService: ProductoService,
    private fb: FormBuilder,
    private spinnerService: SpinnerService,
    private alertService: AlertService) { }

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

  getFarmacias() {
    let filtro = new FiltroLocales();
    filtro.idUsuario = +this.usuarioService.getIdUsuario();
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

  subidaMasiva(): void {
    let dialogUpload = this.dialog.open(SubidaMasivaComponent, {
      width: '30rem'
    });
  }

  nuevoProducto(producto?: Producto): void {
    let dialogProducto: MatDialogRef<NuevoProductoComponent>;
    dialogProducto = this.dialog.open(NuevoProductoComponent, {
      width: '45rem',
      data: {
        farmacias: this.farmacias,
        categorias: this.categorias,
        formasFarmaceuticas: this.formasFarmaceuticas
      }
    });
    dialogProducto.afterClosed().subscribe(response => {
      if (response) {
        let spinner = this.spinnerService.start('Guardando...');
        // guardar producto
        this.productoService.createProducto([response]).subscribe(respProducto => {
          console.log('guardado', respProducto);
          this.spinnerService.stop(spinner);
          this.alertService.success('¡Éxito!', 'Se ha guardado el producto');
        }, error => {
          this.spinnerService.stop(spinner);
          this.alertService.error();
        });
      }
    });
  }

  getProductos() {
    let spinner = this.spinnerService.start('Buscando...');
    let filtro = new FiltroProductos(this.formFiltro.value);
    filtro.radio = 10000000000;
    filtro.pagina = 0;
    filtro.regxpag = 10;
    this.productoService.getProductos(filtro).subscribe(response => {
      // console.log('response', response);
      this.spinnerService.stop(spinner);
      this.totalDatos = response.count;
      this.productos = response.data.length > 0 ? response.data[0].productos : [];
    }, error => {
      this.spinnerService.stop(spinner);
      this.alertService.error();
    });
  }

}
