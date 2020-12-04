import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatGridList } from '@angular/material/grid-list';

@Component({
  selector: 'fury-control-stock',
  templateUrl: './control-stock.component.html',
  styleUrls: ['./control-stock.component.scss']
})
export class ControlStockComponent implements OnInit {

  // Componentes
  @ViewChild('gridProductos') gridProductos: MatGridList;
  gridByBreakpoint: any = [
    { xl: 4, lg: 3, md: 3, sm: 2, xs: 1 },
    { xl: '1.25:1', lg: '1:1.2', md: '1.5:1', sm: '2:1', xs: '3.5:1' }
  ];

  // Filtro
  farmacias: any[] = [
    { id: 1, nombre: 'Mifarma Av. Kennedy' },
    { id: 2, nombre: 'Inka farma Av. Jesús' }
  ];
  productoDesc: string = '';

  // Variables
  productos: any[] = [
    { id: 1, codigo: 'IF001', nombre: 'Ibuprofeno 800mg', farmacia: 'Inkafarma Ejército', stock: 20 },
    { id: 2, codigo: 'IF007', nombre: 'Ibuprofeno 500mg', farmacia: 'Inkafarma Ejército', stock: 15 },
    { id: 3, codigo: 'MF001', nombre: 'Ibuprofeno 800mg', farmacia: 'Mifarma Paucarpata', stock: 3 },
    { id: 4, codigo: 'MF014', nombre: 'Talco bebé', farmacia: 'Mifarma Paucarpata', stock: 15 },
    { id: 5, codigo: 'IF101', nombre: 'Shampoo Ninet', farmacia: 'Inkafarma Ejército', stock: 5 },
    { id: 6, codigo: 'MF201', nombre: 'Panadol Forte Tabletas', farmacia: 'Mifarma Paucarpata', stock: 100 } // ,
    // { id: 7, codigo: 'IF301', nombre: 'Panadol Forte Jarabe', farmacia: 'Inkafarma Ejército', stock: 75 },
    // { id: 8, codigo: 'MF108', nombre: 'Termómetro', farmacia: 'Mifarma Paucarpata', stock: 10 }
  ];
  productosSeleccionados: any[] = [];

  constructor(private mediaObserver: MediaObserver) { }

  ngAfterContentInit(): void {
    this.mediaObserver.asObservable().subscribe((changes: MediaChange[]) => {
      this.gridProductos.cols = this.gridByBreakpoint[0][changes[0].mqAlias];
      this.gridProductos.rowHeight = this.gridByBreakpoint[1][changes[0].mqAlias];
    });
  }

  ngOnInit(): void {
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

}
