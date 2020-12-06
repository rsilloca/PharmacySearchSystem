import { Generico } from './generico';

export class Moneda extends Generico {
    idMoneda: number;
    nombre:	string;
    descripcion: string;

    constructor(obj?: Moneda) {
        super();
        this.idMoneda = obj && obj.idMoneda ? obj.idMoneda : 0;
        this.nombre = obj && obj.nombre ? obj.nombre : "";
        this.descripcion = obj && obj.descripcion ? obj.descripcion : "";
    }
}
