import { Injectable } from '@angular/core';
import { FileItems } from '../models/file-items';
import { ProductosModel } from '../models/productos-models';
import {getStorage,ref,uploadBytesResumable,getDownloadURL,deleteObject} from 'firebase/storage';
import {AngularFirestore,AngularFirestoreCollection} from '@angular/fire/compat/firestore'
import Swal from 'sweetalert2';
import * as $ from "jquery";
import { Observable, map } from 'rxjs';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  
  private CARTERA_IMAGENES='img';
  private productosCollections:AngularFirestoreCollection<ProductosModel>

  constructor(private db:AngularFirestore) { 
    this.productosCollections=db.collection<ProductosModel>('productos')
  }

  getProductos():Observable<ProductosModel[]>{
    return this.productosCollections.snapshotChanges().pipe(
      map(actions =>
        actions.map(a=>{
          const data=a.payload.doc.data() as ProductosModel;
          const id=a.payload.doc.id;

          return {id,...data}
        })
      )

    )

  }

  cargarProductoFirebase(imagenes:FileItems[],productos:ProductosModel){
    const storage=getStorage();
   
    for(const item of imagenes){
      let productoTrim=productos.nombreProducto;
      const storageRef=ref(storage,`${this.CARTERA_IMAGENES}/${productoTrim.replace(/ /g,"" )}`);
      const uploadTask=uploadBytesResumable(storageRef,item.archivo)
      uploadTask.on('state_changed',(snapshot)=>{
        const progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;

      },(err)=>{
          console.log('error al suir archivo');
      }, ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          item.url=downloadURL;
          this.guardarProducto({
            nombreProducto:productos.nombreProducto,
            imgUrl:item.url,
            precio:productos.precio
        })
        })
      })
    }

  }

  async guardarProducto(producto:{nombreProducto:string,imgUrl:string,precio:string}):Promise<any>{
    try{
      Swal.fire({
        icon:'success',
        title:'El archivo se subio correctamente',
        confirmButtonText:'Aceptar',
        allowOutsideClick:false,
      }).then((result)=>{
        if(result.value){
          ($('#productosModal')as any).modal('hide')
        }
      })
    
        return await this.db.collection('productos').add(producto)
    
    }catch(error){
      console.log(error)
    }

  }

  public eliminarProducto(id:string,productoNombre:string):Promise<any>{
    const storage=getStorage()
    const desertRef=ref(storage,`${this.CARTERA_IMAGENES}/${productoNombre.replace(/ /g,"" )}`)
    deleteObject(desertRef).then(()=>{
      Swal.fire('EXITO','La imagen se elimino correctamente','success')
    }

    ).catch((error)=>{
      console.error(error)
    }

    )

    return this.productosCollections.doc(id).delete();

  }

}
