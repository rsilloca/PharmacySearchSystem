import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TOKEN_NAME, TYPE_PHARMACY, TYPE_USER_NAME } from '../@constants/constantes';
import { PATHSERVICE_USUARIO } from '../@constants/rutas';
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
    return this.client.post<Usuario>(url, usuario, { headers: this.header });
  }

  public isPharmacyUser(): boolean {
    return this.getRol() == this.typePharmacy;
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

  isLoggedIn(): boolean {
    return this.getToken() != null;
  }

  currentUser(): Usuario {
    if (this.isLoggedIn()) {
      var token = this.getToken();
      var payload = JSON.parse(atob(token.split('.')[1]));
      let user: Usuario = payload.scopes;
      return user;
    }
    else {
      return null;
    }
  }

  logout() {
    localStorage.clear();
  }

}
