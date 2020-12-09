import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PATHSERVICE_PRODUCTO } from '../@constants/rutas';
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

}
