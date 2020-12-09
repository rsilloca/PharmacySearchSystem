import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PATHSERVICE_FARMACIA } from '../@constants/rutas';
import { Farmacia } from '../@models/farmacia';
import { FiltroLocales } from '../@models/filtro-locales';
import { EncryptService } from './encrypt.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class FarmaciaService {
  private rutaBase = PATHSERVICE_FARMACIA;

  private header = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private client: HttpClient, private encryptService: EncryptService, private userService: UsuarioService) { }

  getFarmacia(idFarmacia: number): Observable<Farmacia>{
    const url = this.rutaBase;
    let parametros = new HttpParams().set('idFarmacia', idFarmacia.toString());
    return this.client.get<Farmacia>(url, {headers: this.header, params: parametros});
  }

  createFarmacia(farmacia: Farmacia): Observable<Farmacia>{
    const url = this.rutaBase;
    let headerF = new HttpHeaders({Authorization:"Bearer "+this.userService.getToken(), 'Content-Type': 'application/json'});
    return this.client.post<Farmacia>(url, farmacia, {headers: headerF});
  }
  
  getFarmaciaFiltros(filtros: FiltroLocales): Observable<any[]>{
    const url = this.rutaBase+'/filtros';
    let parametros = new HttpParams()
    .set('idUsuario', filtros.idUsuario.toString())
    .set('nombre', filtros.nombre)
    .set('radio', filtros.radio.toString())
    .set('ordenamiento', filtros.ordenamiento.toString())
    .set('latitud', filtros.latitud.toString())
    .set('longitud', filtros.longitud.toString())
    .set('pagina', filtros.pagina.toString())
    .set('regxpag', filtros.regxpag.toString());

    return this.client.get<any>(url, {headers: this.header, params: parametros});
  }
}
