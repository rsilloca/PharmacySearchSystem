import { Generico } from './generico';

export class FormaFarmaceutica extends Generico {
    idFormaFarmaceutica: number;
    nombre:	string;
    descripcion: string;

    constructor(obj?: FormaFarmaceutica) {
        super();
        this.idFormaFarmaceutica = obj && obj.idFormaFarmaceutica ? obj.idFormaFarmaceutica : 0;
        this.nombre = obj && obj.nombre ? obj.nombre : "";
        this.descripcion = obj && obj.descripcion ? obj.descripcion : "";
    }
}