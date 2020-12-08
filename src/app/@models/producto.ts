import { Generico } from './generico';

export class Producto extends Generico {
    idProducto : number;
    idCategoria : number;
    idFormaFarmaceutica : number;
    idFarmacia : number;
    codigo : string;
    nombre : string;
    stock : number;
    precioUnitario : number;
    fraccion : number;
    marca : string;
    descripcion : string;
    fechaVencimiento : string;

    constructor(obj?: Producto){
        super();
        this.idProducto = obj && obj.idProducto ? obj.idProducto : 0;
        this.idCategoria = obj && obj.idCategoria ? obj.idCategoria : 0;
        this.idFormaFarmaceutica = obj && obj.idFormaFarmaceutica ? obj.idFormaFarmaceutica : 0;
        this.idFarmacia = obj && obj.idFarmacia ? obj.idFarmacia : 0;
        this.codigo = obj && obj.codigo ? obj.codigo : "";
        this.nombre = obj && obj.nombre ? obj.nombre : "";
        this.stock = obj && obj.stock ? obj.stock : 0;
        this.precioUnitario = obj && obj.precioUnitario ? obj.precioUnitario : 0;
        this.fraccion = obj && obj.fraccion ? obj.fraccion : 0;
        this.marca = obj && obj.marca ? obj.marca : "";
        this.descripcion = obj && obj.descripcion ? obj.descripcion : "";
        this.fechaVencimiento = obj && obj.fechaVencimiento ? obj.fechaVencimiento : "";
    }

}

