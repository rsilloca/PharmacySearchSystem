import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  static toDateSBF(date: Date): string {
    // 2020-12-06T15:03:20.143Z
    let dia = date.getFullYear() + "-" + this.toNumberDate(date.getMonth()) + "-" + this.toNumberDate(date.getDate());
    let hora = this.toNumberDate(date.getHours()) + ":" + this.toNumberDate(date.getMinutes()) + ":" + this.toNumberDate(date.getSeconds());
    return dia + "T" + hora + "3Z";
  }

  static toNumberDate(numero: number): string {
    return numero < 10 ? "0" + numero : numero.toString();
  }

}
