import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PATHSERVICE_CONFIGURACION } from '../@constants/rutas';
import { Categoria } from '../@models/categoria';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  private rutaBase = PATHSERVICE_CONFIGURACION;
  private header = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private client: HttpClient) { }

  getCategorias(): Observable<Categoria[]> {
    const url = this.rutaBase + "/categorias";
    return this.client.get<Categoria[]>(url, { headers: this.header });
  }

}