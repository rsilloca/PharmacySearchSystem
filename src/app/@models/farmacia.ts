import { Generico } from './generico';
import { Horario } from './horario';
import { Moneda } from './moneda';
import { Producto } from './producto';
import { Usuario } from './usuario';
export class Farmacia extends Generico {
    idFarmacia: number;
    direccion: string;
    latitud: number;
    longitud: number;
    distancia: number;
    idMoneda: number;
    monedas: Moneda;
    horarios: Horario[];
    productos: Producto[];
    usuarioFarmacia: Usuario[];

    constructor(obj?: Farmacia) {
        super();
        this.idFarmacia = obj && obj.idFarmacia ? obj.idFarmacia : 0;
        this.direccion = obj && obj.direccion ? obj.direccion : "";
        this.latitud = obj && obj.latitud ? obj.latitud : 0;
        this.longitud = obj && obj.longitud ? obj.longitud : 0;
        this.distancia = obj && obj.distancia ? obj.distancia : 0;
        this.idMoneda = obj && obj.idMoneda ? obj.idMoneda : 0;
        this.monedas = obj && obj.monedas ? obj.monedas : new Moneda();
        this.horarios = obj && obj.horarios ? obj.horarios : [];
        this.productos= obj && obj.productos ? obj.productos : [];
        this.usuarioFarmacia = obj && obj.usuarioFarmacia ? obj.usuarioFarmacia : [];
    }
}
