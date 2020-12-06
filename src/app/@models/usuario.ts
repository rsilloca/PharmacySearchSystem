import { Farmacia } from './farmacia';
import { Generico } from './generico';
import { Rol } from './rol';

export class Usuario extends Generico {
    idUsuario: number;
    idTipoDocumento: number;
    usuario1: string;
    clave: string;
    nombre: string;
    apePat: string;
    apeMat: string;
    documento: string;
    correo: string;
    roles: Rol[];
    farmacias: Farmacia[]

    constructor(obj?: Usuario) {
        super();
        this.idUsuario = obj && obj.idUsuario ? obj.idUsuario : 0;
        this.idTipoDocumento = obj && obj.idTipoDocumento ? obj.idTipoDocumento : 0;
        this.usuario1 = obj && obj.usuario1 ? obj.usuario1 : "";
        this.clave = obj && obj.clave ? obj.clave : "";
        this.nombre = obj && obj.nombre ? obj.nombre : "";
        this.apeMat = obj && obj.apeMat ? obj.apeMat : "";
        this.apePat = obj && obj.apePat ? obj.apePat : "";
        this.documento = obj && obj.documento ? obj.documento : "";
        this.correo = obj && obj.correo ? obj.correo : "";
        this.roles = obj && obj.roles ? obj.roles : [];
        this.farmacias = obj && obj.farmacias ? obj.farmacias : [];
    }

}
