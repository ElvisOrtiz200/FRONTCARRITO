import { Component, OnInit } from '@angular/core';

import { ProductosService } from '../services/productos.service';
import { ProductoModel } from '../models/producto.model';
import { AlertController, ModalController } from '@ionic/angular';
import { AgregarproductoPage } from '../agregarproducto/agregarproducto.page';
import { EditarProductoPage } from '../editar-producto/editar-producto.page';
 
@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  productos:ProductoModel[] | [];
  constructor(private service:ProductosService,
  private modalCtrl:ModalController) { this.productos = [];  }
  ngOnInit() {
  this.service.ObtenerTodos().subscribe(
  response=>{
  this.productos=response;
  });
  }
  Agregar(){
    this.modalCtrl.create({
      component: AgregarproductoPage,
      componentProps: {
        // Puedes pasar propiedades al modal si lo necesitas
      }
    }).then(modal => {
      modal.onDidDismiss().then((data) => {
        if (data.data) {
          // Si hay un producto nuevo creado, agrega a la lista
          //this.productos.push(data.data);
        }
      });
      modal.present();
    });
  }

  eliminar(id: number) {
    // Llama al servicio para eliminar el producto
    this.service.Eliminar(id).subscribe(response => {
      this.loadProductos();
    });
  }
  
  private loadProductos() {
    this.service.ObtenerTodos().subscribe(response => {
      this.productos = response;
    });
  }
  editarProducto(producto: ProductoModel) {
    if (!producto) return; // Verifica si producto es undefined
  
    this.modalCtrl.create({
      component: EditarProductoPage,
      componentProps: { producto }
    }).then(modal => {
      modal.onDidDismiss().then(data => {
        if (data.data) {
          const index = this.productos.findIndex(p => p.idproducto === producto.idproducto);
          
          if (index !== -1) {
            // Asegúrate de que data.data no es undefined
            this.productos[index] = data.data; // Actualiza el producto editado
          }
        }
      });
      modal.present();
    });
  }
   

}
