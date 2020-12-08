import {Generico} from './generico';
import {Parametro} from './parametro';
import {FormaFarmaceutica} from './FormaFarmaceutica';
import {Categoria} from './categoria';
import {Farmacia} from './farmacia';

export class Producto extends Generico {
    idProducto: number;
    idCategoria: number;
    idParametro:number;
    idFarmacia:number;
    codigo:string;
    valor: string;
    stock:number;
    precioUnitario: number;
    marca: string;
    idFormaFarmaceutica: number;

    constructor(obj?:Producto){
        super()
        this.idCategoria = obj && obj.idCategoria ? obj.idCategoria : 0;
        this.idParametro = obj && obj.idParametro ? obj.idParametro : 0;
        this.idFormaFarmaceutica = obj && obj.idFormaFarmaceutica ? obj.idFormaFarmaceutica : 0;
        this.codigo = obj && obj.codigo ? obj.codigo : "";
        this.valor = obj && obj.valor ? obj.valor : "";
        this.stock = obj && obj.stock ? obj.stock : 0;
        this.precioUnitario = obj && obj.precioUnitario ? obj.precioUnitario : 0;
        this.marca = obj && obj.marca ? obj.marca :"";
      
      
    }
}

