import { Generico } from './generico';

export class Parametro extends Generico {
    idParametro: number;
    nombre:	string;
    descripcion: string;
    valor: string;

    constructor(obj?: Parametro) {
        super();
        this.idParametro = obj && obj.idParametro ? obj.idParametro : 0;
        this.nombre = obj && obj.nombre ? obj.nombre : "";
        this.descripcion = obj && obj.descripcion ? obj.descripcion : "";
        this.valor = obj && obj.valor ? obj.valor : "";
      
    }
}
