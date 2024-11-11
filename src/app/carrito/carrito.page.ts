import { Component, OnInit } from '@angular/core';
import { ItemCarritoModel } from '../models/item-carrito.model';
import { CompraService } from '../services/compra.service';
import { Compra } from '../models/compra.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

    listaItemsCarrito : ItemCarritoModel[] | undefined;
    public clienteId: number = 0;

    public total =0 ;
  constructor(private compraService: CompraService,private router: Router) { }

  ngOnInit() {
    this.MuestraCarrito();
    this.obtenerClienteId();
    console.log(this.listaItemsCarrito);
  }

  obtenerClienteId() {
    const usuario = localStorage.getItem('usuario'); // Suponiendo que el usuario esté guardado en localStorage
    if (usuario) {
      const usuarioObj = JSON.parse(usuario);
      this.clienteId = usuarioObj.id; // Suponiendo que el usuario tiene un campo `id`
    }
  }

  VaciarCarrito() {
    localStorage.removeItem('carrito'); // Elimina solo la clave listaItemsCarrito
    this.listaItemsCarrito = []; // Limpia la variable en la aplicación
}


  eliminarProductoCarrito(i:number){
    let carritoStorage = localStorage.getItem("carrito") as string;
    let carrito = JSON.parse(carritoStorage);
    carrito.splice(i,1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    this.MuestraCarrito();
  }

  MuestraCarrito(){
    let carritoStorage=localStorage.getItem("carrito") as string;
    let carrito=JSON.parse(carritoStorage);
    this.listaItemsCarrito=carrito;
    this.TotalCarrito();
    }

  TotalCarrito(){
    let carritoStorage=localStorage.getItem("carrito") as string;
    let carrito=JSON.parse(carritoStorage);
    let suma = 0;
    for (var i = 0; i < carrito.length; i++){
    suma += carrito[i].precio*carrito[i].cantidad;
    }
    this.total = suma;
}

comprar() {
  // Obtener el cliente del localStorage y parsear el JSON
  const usuario = localStorage.getItem('usuario');
  
  if (!usuario) {
    console.error('El cliente no está logueado');
    return;
  }

  const usuarioObj = JSON.parse(usuario); // Convertir el string JSON en un objeto

  // Obtener el cliente_id
  const clienteId = usuarioObj.cliente_id; // Acceder solo al cliente_id

  if (!clienteId) {
    console.error('No se encontró el cliente_id');
    return;
  }

  // Crear el objeto con los productos y la información del cliente
  const compraData = {
    cliente_id: clienteId, // Ahora es un número
    productos: this.listaItemsCarrito!.map(item => ({
      idproducto: item.idproducto,
      cantidad: item.cantidad,
      precio: item.precio
    }))
  };

  // Mostrar la estructura que se enviará
  console.log('Datos a enviar al backend:', compraData);

  // Enviar la data al servicio
  this.compraService.realizarCompra(compraData).subscribe(
    (response) => {
      console.log('Compra realizada con éxito', response);
      // Limpiar el carrito después de la compra
      this.VaciarCarrito();


      this.router.navigate(['/catalogopage']);
    },
    (error) => {
      console.error('Error al realizar la compra', error);
      console.log(error.error.errors); // Ver errores más específicos del backend
    }
  );
}





}
