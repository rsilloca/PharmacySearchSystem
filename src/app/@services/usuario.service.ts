import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PATHSERVICE_USUARIO } from '../@constants/rutas';
import { Usuario } from '../@models/usuario';
import { EncryptService } from './encrypt.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private rutaBase = PATHSERVICE_USUARIO;
  private header = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private client: HttpClient, private encryptService: EncryptService) { }

  login(user: string, pass: string): Observable<any> {
    const url = this.rutaBase + "/login";
    let password = this.encryptService.encriptAll(pass);
    let headers = new HttpHeaders({'Authorization': 'Basic ' + btoa(user + ':' + password)});
    return this.client.post(url, {}, {headers: headers});
  }

  getUsuario(idUsuario: number): Observable<Usuario> {
    const url = this.rutaBase;
    let parametros = new HttpParams().set('idUsuario', idUsuario.toString());
    return this.client.get<Usuario>(url, { headers: this.header, params: parametros });
  }

  createUsuario(usuario: Usuario): Observable<Usuario> {
    const url = this.rutaBase;
    return this.client.post<Usuario>(url, usuario, { headers: this.header });
  }

}
