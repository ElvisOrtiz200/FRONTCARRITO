import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { ProductoModel } from '../models/producto.model';
import { AlertController, ModalController } from '@ionic/angular';
import { AgregarproductoPage } from '../agregarproducto/agregarproducto.page';
import { EditarProductoPage } from '../editar-producto/editar-producto.page';
import { AgregarcategoriaPage } from '../agregarcategoria/agregarcategoria.page';
import { CategoriaModel } from '../models/categoria.model';
import { CategoriaService } from '../services/categoria.service';
import { EditarCategoriaPage } from '../editar-categoria/editar-categoria.page';
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {

  productos:CategoriaModel[] | [];
  constructor(private service:CategoriaService,
  private modalCtrl:ModalController) { this.productos = [];  }
  ngOnInit() {
  this.service.ObtenerTodos().subscribe(
  response=>{
  this.productos=response;
  });
  } 
  Agregar(){
    this.modalCtrl.create({
      component: AgregarcategoriaPage,
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
  editarProducto(producto: CategoriaModel) {
    if (!producto) return; // Verifica si producto es undefined
  
    this.modalCtrl.create({
      component: EditarCategoriaPage,
      componentProps: { producto }
    }).then(modal => {
      modal.onDidDismiss().then(data => {
        if (data.data) {
          const index = this.productos.findIndex(p => p.idcategoria === producto.idcategoria);
          
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
 