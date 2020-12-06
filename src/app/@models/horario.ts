import { Generico } from './generico';

export class Horario extends Generico {
    idHorario: number;
    diaSemana: number;
    horaApertura: string;
    horaCierre: string;

    constructor(obj?: Horario) {
        super();
        this.idHorario = obj && obj.idHorario ? obj.idHorario : 0;
        this.diaSemana = obj && obj.diaSemana ? obj.diaSemana : 0;
        this.horaApertura = obj && obj.horaApertura ? obj.horaApertura : new Date().toDateString();
        this.horaCierre = obj && obj.horaCierre ? obj.horaCierre : new Date().toDateString();
    }
}
