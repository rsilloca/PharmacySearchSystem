import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LATITUD_DEFAULT, LOCATION_NAME, LOCATION_TYPE_NAME, LONGITUD_DEFAULT, TOKEN_NAME, TYPE_LOCATION_AUTOMATIC, TYPE_LOCATION_MANUAL, TYPE_PHARMACY, TYPE_USER_NAME } from '../@constants/constantes';
import { PATHSERVICE_USUARIO } from '../@constants/rutas';
import { Rol } from '../@models/rol';
import { Token } from '../@models/token';
import { Usuario } from '../@models/usuario';
import { EncryptService } from './encrypt.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private rutaBase = PATHSERVICE_USUARIO;
  private header = new HttpHeaders({ 'Content-Type': 'application/json' });
  private tokenName = TOKEN_NAME;
  private typeUserName = TYPE_USER_NAME;
  private typePharmacy = TYPE_PHARMACY;

  constructor(private client: HttpClient, private encryptService: EncryptService) { }

  login(user: string, pass: string): Observable<Token> {
    const url = this.rutaBase + "/login";
    let password = this.encryptService.encriptAll(pass);
    let headers = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(user + ':' + password) });
    return this.client.post(url, {}, { headers: headers })
      .pipe(
        map((response: Token) => {
          let token = (<any>response) as Token;
          if (token && token.accessToken) {
            this.saveToken(token.accessToken);
          }
          return response;
        }));
  }

  getUsuario(idUsuario: number): Observable<Usuario> {
    const url = this.rutaBase;
    let parametros = new HttpParams().set('idUsuario', idUsuario.toString());
    return this.client.get<Usuario>(url, { headers: this.header, params: parametros });
  }

  createUsuario(usuario: Usuario): Observable<Usuario> {
    const url = this.rutaBase;
    usuario.clave = this.encryptService.encriptAll(usuario.clave);
    return this.client.post<Usuario>(url, usuario, { headers: this.header });
  }

  updateUsuario(usuario: Usuario): Observable<Usuario> {
    const url = this.rutaBase;
    return this.client.put<Usuario>(url, usuario, {headers: this.header});
  }

  public isPharmacyUser(): boolean {
    return this.getRol() == this.typePharmacy.toString();
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenName, token);
  }

  getToken(): string {
    return localStorage.getItem(this.tokenName);
  }

  getRol(): string {
    return (this.currentUser() as any).Roles[0].toString();
  }

  getIdUsuario(): string {
    return (this.currentUser() as any).IdUsuario;
  }

  isLoggedIn(): boolean {
    return this.getToken() != null;
  }

  currentUser(): Usuario {
    if (this.isLoggedIn()) {
      var token = this.getToken();
      var payload = JSON.parse(atob(token.split('.')[1]));
      let user: Usuario = payload.scopes;
      // user.idUsuario = (user as any).IdUsuario;
      // user.usuario1 = (user as any).Usuario;
      // user.documento = (user as any).Documento;
      // user.roles = (user as any).Roles;
      // user.farmacias = (user as any).Farmacias;
      return user;
    }
    else {
      return null;
    }
  }

  currentUserSBF(): Usuario {
    if (this.isLoggedIn()) {
      var token = this.getToken();
      var payload = JSON.parse(atob(token.split('.')[1]));
      let user: Usuario = payload.scopes;
      let currentUser: Usuario = new Usuario();
      let rol: Rol = new Rol();
      rol.idRol = +this.getRol();
      currentUser.idUsuario = (user as any).IdUsuario;
      currentUser.usuario1 = (user as any).Usuario;
      currentUser.documento = (user as any).Documento;
      currentUser.roles = [rol];
      //currentUser.farmacias = (user as any).Farmacias;
      return currentUser;
    }
    else {
      return null;
    }
  }
  logout() {
    localStorage.clear();
  }
  saveLocation(lat: number, lng: number) {
    let location = JSON.stringify([lat, lng]);
    localStorage.setItem(LOCATION_NAME, location.toString());
    this.setTypeLocation(TYPE_LOCATION_MANUAL);
  }
  getLocation() {
    let location = localStorage.getItem(LOCATION_NAME);
    return location ? JSON.parse(location) : null;
  }
  setTypeLocation(type: number) {
    localStorage.setItem(LOCATION_TYPE_NAME, type.toString());
  }
  getTypeLocation() {
    let type = localStorage.getItem(LOCATION_TYPE_NAME);
    if (!type) {
      type = TYPE_LOCATION_AUTOMATIC.toString();
      this.setTypeLocation(+type);
    }
    return type;
  }
  getNavigatorGeolocation(): Promise<any> {
    console.log('ubicación automática');
    if (navigator.geolocation) {
      return new Promise<any>(resolve => {
        navigator.geolocation.getCurrentPosition(position => {
          console.log('ubicación obtenida', position);
          if (position) {
            resolve({
              latitud: position.coords.latitude,
              longitud: position.coords.longitude
            });
          } else {
            resolve({
              latitud: LATITUD_DEFAULT,
              longitud: LONGITUD_DEFAULT
            });
          }

        });
      });
    } else {
      return new Promise<any>(resolve => {
        console.log('Error', 'La geolocalización no es soportada en este navegador');
        resolve({
          latitud: LATITUD_DEFAULT,
          longitud: LONGITUD_DEFAULT
        });
      });
    }
  }

}
