import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PATHSERVICE_PRODUCTO } from '../@constants/rutas';
import { FiltroProductos } from '../@models/filtro-productos';
import { Producto } from '../@models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private rutaBase = PATHSERVICE_PRODUCTO;
  private header = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private client: HttpClient) { }

  createProducto(productos: Producto[]): Observable<Producto[]>{
    const url = this.rutaBase;
    return this.client.post<Producto[]>(url, productos, {headers: this.header});
  }

  getProductos(filtros: FiltroProductos): Observable<any> {
    const url = this.rutaBase + "/filtros";
    let parametros = new HttpParams()
    .set('radio', filtros.radio.toString())
    .set('ordenamiento', filtros.ordenamiento.toString())
    .set('latitud', filtros.latitud.toString())
    .set('longitud', filtros.longitud.toString())
    .set('categoria', filtros.categoria.toString())
    .set('presentacion', filtros.presentacion.toString())
    .set('precioMinimo', filtros.precioMinimo.toString())
    .set('precioMaximo', filtros.precioMaximo.toString())
    .set('idFarmacia', filtros.idFarmacia.toString())
    .set('pagina', filtros.pagina.toString())
    .set('regxpag', filtros.regxpag.toString());
    if (filtros.nombre.length > 0) parametros = parametros.set('nombre', filtros.nombre);
    return this.client.get<any>(url, {headers: this.header, params: parametros});
  }

}
