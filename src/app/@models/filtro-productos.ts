export class FiltroProductos {
    nombre: string;
    latitud: number;
    longitud: number;
    radio: number;
    ordenamiento: number;
    categoria: number;
    presentacion: number;
    precioMinimo: number;
    precioMaximo: number;
    idFarmacia: number;
    estado: number;
    stock: number;
    pagina: number;
    regxpag: number;
    constructor(obj?: FiltroProductos) {
        this.nombre = obj && obj.nombre ? obj.nombre : "";
        this.latitud = obj && obj.latitud ? obj.latitud : 0;
        this.longitud = obj && obj.longitud ? obj.longitud : 0;
        this.radio = obj && obj.radio ? obj.radio : 0;
        this.ordenamiento = obj && obj.ordenamiento ? obj.ordenamiento : 0;
        this.categoria = obj && obj.categoria ? obj.categoria : 0;
        this.presentacion = obj && obj.presentacion ? obj.presentacion : 0;
        this.precioMinimo = obj && obj.precioMinimo ? obj.precioMinimo : 0;
        this.precioMaximo = obj && obj.precioMaximo ? obj.precioMaximo : 0;
        this.idFarmacia = obj && obj.idFarmacia ? obj.idFarmacia : 0;
        this.estado = obj && obj.estado ? obj.estado : 2;
        this.stock = obj && obj.stock ? obj.stock : 0;
        this.pagina = obj && obj.pagina ? obj.pagina : 0;
        this.regxpag = obj && obj.regxpag ? obj.regxpag : 0;
    }
}
