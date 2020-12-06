import { Generico } from './generico';

export class Categoria extends Generico {
    idCategoria: number;
    nombre: string;
    descripcion: string;
    constructor(obj?: Categoria) {
        super();
        this.idCategoria = obj && obj.idCategoria ? obj.idCategoria : 0;
        this.nombre = obj && obj.nombre ? obj.nombre : "";
        this.descripcion = obj && obj.descripcion ? obj.descripcion : "";
    }
}
