import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  static toDateSBF(date: Date): string {
    date.setHours(date.getHours() + 5);
    let dia = date.getFullYear() + "-" + this.toNumberDate(date.getMonth() + 1) + "-" + this.toNumberDate(date.getDate());
    let hora = this.toNumberDate(date.getHours()) + ":" + this.toNumberDate(date.getMinutes()) + ":" + this.toNumberDate(date.getSeconds());
    return dia + "T" + hora + "." + date.getMilliseconds() +"Z";
  }

  private static toNumberDate(numero: number): string {
    return numero < 10 ? "0" + numero : numero.toString();
  }

}
