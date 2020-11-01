import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  public login(farmacia: boolean, user: string, pwd: string) {
    localStorage.setItem("logged", "true");
    let typeUser: string = farmacia ? "1" : "0";
    localStorage.setItem("type", typeUser);
  }

  public logout() {
    localStorage.clear();
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem("logged") != null;
  }

  public isPharmacyUser(): boolean {
    let type = localStorage.getItem("type");
    return type != null && type == "1" ? true : false;
  }

}
