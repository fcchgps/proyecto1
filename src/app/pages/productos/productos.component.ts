import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileItems } from 'src/app/models/file-items';
import { ProductosModel } from 'src/app/models/productos-models';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos:ProductosModel[]=[];
  imagenes:FileItems[]=[];
  imgURL='../../../assets/noimage.png';
  file:any;

  productosForm=this.fb.group({
    nombre:['',[Validators.required]],
    precio:['',[Validators.required]],
  })

  constructor(private router:Router,private fb:FormBuilder,private productoSvc:ProductosService) { }

  ngOnInit() {
    this.productoSvc.getProductos().subscribe(res=>{
      this.productos=[];
      res.forEach((element:ProductosModel)=>{

        this.productos.push(
          {
            ...element
          }
        )
      })
      console.log("Lista de productos desde la BD")
      console.log(this.productos)
    })
  }

  selectChange(event:any){
    console.log(event.target.files);
    if(event.target.files.length>0) {

      this.file=event.target.files
      let reader=new FileReader();
      reader.readAsDataURL(this.file[0])
      reader.onloadend=(event:any)=>{

        this.imgURL=event.target.result;

        this.imagenes.push({
          archivo:this.file[0]
        })

      }
    }else{
      this.imgURL;
    }

  }

  registrarProducto(){
    console.log(this.productosForm.value)
    let cargaProducto:any={
      nombreProducto:this.productosForm.value.nombre,
      precio:this.productosForm.value.precio
    }

    this.productoSvc.cargarProductoFirebase(this.imagenes,cargaProducto);

  }

  eliminar(id:any,productoNombre:string){
    Swal.fire({
      icon:'question',
      title:`Desea eliminar el prodcuto ${productoNombre}`,
      showCancelButton:true,
      confirmButtonText:'Aceptar',
      allowOutsideClick:false


    }).then((result)=>{
      this.productoSvc.eliminarProducto(id,productoNombre);
    })
   
  }

  limpiarForm(){
    this.productosForm.reset();
    this.imgURL='../../../assets/noimage.png';
  }


}
