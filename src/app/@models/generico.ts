import { UtilsService } from '../@services/utils.service';

export class Generico {
    logFechaCrea: string;
    logFechaModif: string;
    logEstado: number;

    constructor(obj?: Generico) {
        this.logFechaCrea = obj && obj.logFechaCrea ? obj.logFechaCrea : UtilsService.toDateSBF(new Date());
        this.logFechaModif = obj && obj.logFechaModif ? obj.logFechaModif : UtilsService.toDateSBF(new Date());
        this.logEstado = obj && obj.logEstado ? obj.logEstado : 1;
    }

}
