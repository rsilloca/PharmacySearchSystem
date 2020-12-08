import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Categoria } from 'src/app/@models/categoria';
import { Farmacia } from 'src/app/@models/farmacia';
import { FiltroLocales } from 'src/app/@models/filtro-locales';
import { FormaFarmaceutica } from 'src/app/@models/formaFarmaceutica';
import { ConfiguracionService } from 'src/app/@services/configuracion.service';
import { FarmaciaService } from 'src/app/@services/farmacia.service';
import { UsuarioService } from 'src/app/@services/usuario.service';
import { SpinnerService } from 'src/app/shared/spinner.service';
import { NuevoProductoComponent } from './nuevo-producto/nuevo-producto.component';
import { SubidaMasivaComponent } from './subida-masiva/subida-masiva.component';

// Tabla de productos
export interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  precio: number;
  marca: string;
  stock: number;
}

const ELEMENT_DATA: Producto[] = [
  { id: 1, codigo: 'MF001', nombre: 'Paracetamol', precio: 13, marca: 'Portugal', stock: 30 },
  { id: 2, codigo: 'MF002', nombre: 'Aspirina', precio: 15, marca: 'Forte', stock: 20 },
  { id: 3, codigo: 'MF003', nombre: 'Alcohol', precio: 20, marca: 'Mi farma', stock: 5 },
  { id: 4, codigo: 'MF004', nombre: 'Aciclovir', precio: 23, marca: 'Farma sur', stock: 3 },
  { id: 5, codigo: 'MF005', nombre: 'Pañales Babysec x64', precio: 65, marca: 'Babysec', stock: 10 },
  { id: 6, codigo: 'MF006', nombre: 'Jabon asepsia', precio: 5, marca: 'Asepsia', stock: 50 },
];

@Component({
  selector: 'fury-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  // TABLA
  displayedColumns: string[] = ['numero', 'codigo', 'nombre', 'precio', 'marca', 'stock', 'acciones'];
  dataSource = new MatTableDataSource<Producto>(ELEMENT_DATA);

  // Datos agregar producto
  farmacias: Farmacia[];
  categorias: Categoria[];
  formasFarmaceuticas: FormaFarmaceutica[];

  constructor(private dialog: MatDialog,
    private farmaciaService: FarmaciaService,
    private configuracionService: ConfiguracionService,
    private usuarioService: UsuarioService,
    private spinnerService: SpinnerService) { }

  ngOnInit(): void {
  }

  subidaMasiva(): void {
    let dialogUpload = this.dialog.open(SubidaMasivaComponent, {
      width: '30rem'
    });
  }

  nuevoProducto(producto?: Producto): void {
    let spinner = this.spinnerService.start();
    let dialogProducto: MatDialogRef<NuevoProductoComponent>;
    let filtro = new FiltroLocales();
    filtro.idUsuario = +this.usuarioService.getIdUsuario();
    filtro.pagina = 0;
    filtro.regxpag = 1000;
    filtro.radio = 10000;
    this.farmaciaService.getFarmaciaFiltros(filtro).subscribe(respFarmacias => {
      this.farmacias = (respFarmacias as any).data;
      this.configuracionService.getCategorias().subscribe(respCategorias => {
        this.categorias = respCategorias;
        this.configuracionService.getFormasFarmaceuticas().subscribe(respFormas => {
          this.formasFarmaceuticas = respFormas;
          this.spinnerService.stop(spinner);
          dialogProducto = this.dialog.open(NuevoProductoComponent, {
            width: '50rem',
            data: {
              farmacias: this.farmacias,
              categorias: this.categorias,
              formasFarmaceuticas: this.formasFarmaceuticas
            }
          });
          dialogProducto.afterClosed().subscribe(response => {
            if (response) {
              // guardar producto
            }
          });
        });
      });
    });
  }

}
