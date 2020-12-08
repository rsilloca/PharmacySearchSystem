import { Generico } from './generico';

export class Rol extends Generico {
    idRol: number;
    descripcion: string;

    constructor(obj?: Rol) {
        super();
        this.idRol = obj && obj.idRol ? obj.idRol : 0;
        this.descripcion = obj && obj.descripcion ? obj.descripcion : "";
    }

}
