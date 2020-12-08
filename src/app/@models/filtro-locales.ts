export class FiltroLocales {
    idUsuario: number;
    nombre: string;
    radio: number;
    ordenamiento: number;
    latitud: number;
    longitud: number;
    pagina: number;
    regxpag: number;

    constructor(objeto?: FiltroLocales) {
        this.idUsuario = objeto && objeto.idUsuario ? objeto.idUsuario : 0;
        this.nombre = objeto && objeto.nombre ? objeto.nombre : "";
        this.radio = objeto && objeto.radio ? objeto.radio : 0;
        this.ordenamiento = objeto && objeto.ordenamiento ? objeto.ordenamiento : 0;
        this.latitud = objeto && objeto.latitud ? objeto.latitud : 0;
        this.longitud = objeto && objeto.longitud ? objeto.longitud : 0;
        this.pagina = objeto && objeto.pagina ? objeto.pagina : 0;
        this.regxpag = objeto && objeto.regxpag ? objeto.regxpag : 0;
    }

}
