import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatGridList } from '@angular/material/grid-list';
import { Farmacia } from 'src/app/@models/farmacia';
import { FiltroLocales } from 'src/app/@models/filtro-locales';
import { FarmaciaService } from 'src/app/@services/farmacia.service';
import { UsuarioService } from 'src/app/@services/usuario.service';

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
  productoDesc: string = '';
  formFiltro: FormGroup;

  // Variables
  productos: any[] = [
    { id: 1, codigo: 'IF001', nombre: 'Ibuprofeno 800mg', farmacia: 'Inkafarma Ejército', stock: 20 },
    { id: 2, codigo: 'IF007', nombre: 'Ibuprofeno 500mg', farmacia: 'Inkafarma Ejército', stock: 15 },
    { id: 3, codigo: 'MF001', nombre: 'Ibuprofeno 800mg', farmacia: 'Mifarma Paucarpata', stock: 3 },
    { id: 4, codigo: 'MF014', nombre: 'Talco bebé', farmacia: 'Mifarma Paucarpata', stock: 15 },
    { id: 5, codigo: 'IF101', nombre: 'Shampoo Ninet', farmacia: 'Inkafarma Ejército', stock: 5 },
    { id: 6, codigo: 'MF201', nombre: 'Panadol Forte Tabletas', farmacia: 'Mifarma Paucarpata', stock: 100 },
    { id: 7, codigo: 'IF301', nombre: 'Panadol Forte Jarabe', farmacia: 'Inkafarma Ejército', stock: 75 },
    { id: 8, codigo: 'MF108', nombre: 'Termómetro', farmacia: 'Mifarma Paucarpata', stock: 10 },
    { id: 4, codigo: 'MF014', nombre: 'Talco bebé', farmacia: 'Mifarma Paucarpata', stock: 15 },
    { id: 5, codigo: 'IF101', nombre: 'Shampoo Ninet', farmacia: 'Inkafarma Ejército', stock: 5 },
    { id: 6, codigo: 'MF201', nombre: 'Panadol Forte Tabletas', farmacia: 'Mifarma Paucarpata', stock: 100 },
    { id: 7, codigo: 'IF301', nombre: 'Panadol Forte Jarabe', farmacia: 'Inkafarma Ejército', stock: 75 },
  ];
  productosSeleccionados: any[] = [];

  constructor(private mediaObserver: MediaObserver, private fb: FormBuilder,
    private farmaciaService: FarmaciaService, private userService: UsuarioService) { }

  ngAfterContentInit(): void {
    this.mediaObserver.asObservable().subscribe((changes: MediaChange[]) => {
      this.gridProductos.cols = this.gridByBreakpoint[0][changes[0].mqAlias];
    });
  }

  ngOnInit(): void {
    this.formFiltro = this.fb.group({
      idFarmacia: [null],
      nombre: ['']
    });
    this.listarFarmacias();
  }

  seleccionarProducto(producto: any): void {
    if (this.productosSeleccionados.findIndex((p: any) => p.id == producto.id) < 0) {
      this.productosSeleccionados.push(producto);
    }
  }

  eliminarProductoSeleccionado(producto: any): void {
    let index = this.productosSeleccionados.findIndex((p: any) => p.id == producto.id);
    if (index >= 0) {
      this.productosSeleccionados.splice(index, 1);
    }
  }

  listarFarmacias() {
    let filtros = new FiltroLocales();
    filtros.idUsuario = +this.userService.getIdUsuario();
    filtros.radio = 1000000000;
    filtros.pagina = 0;
    filtros.regxpag = 1000;
    this.farmaciaService.getFarmaciaFiltros(filtros).subscribe(response => {
      this.farmacias = (response as any).data;
    });
  }

}
