export class Generico {
    logFechaCrea: string;
    logFechaModif: string;
    logEstado: number;

    constructor(obj?: Generico) {
        this.logFechaCrea = obj && obj.logFechaCrea ? obj.logFechaCrea : new Date().toDateString();
        this.logFechaModif = obj && obj.logFechaModif ? obj.logFechaModif : new Date().toDateString();
        this.logEstado = obj && obj.logEstado ? obj.logEstado : 1;
    }

}
