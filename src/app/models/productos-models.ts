export class ProductosModel{
    id?:string;
    nombreProducto:string;
    imgUrl:string;
    precio:string;

    constructor(nombreProducto:string,imgUrl:string,precio:string){
        this.nombreProducto=nombreProducto;
        this.imgUrl=imgUrl;
        this.precio=precio;

    }



}