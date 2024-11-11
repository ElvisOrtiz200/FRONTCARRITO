import { Component, OnInit } from '@angular/core';
import { CompraService } from '../services/compra.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.page.html',
  styleUrls: ['./mis-compras.page.scss'],
})
export class MisComprasPage implements OnInit {
  compraSeleccionada: number | null = null;
  compras: any[] = []; // Array para almacenar las compras
  clienteId!: number;
  constructor(private compraService: CompraService,private modalController: ModalController) {
    // Obtener el cliente_id del localStorage
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const usuarioObj = JSON.parse(usuario);
      this.clienteId = usuarioObj.cliente_id; // Obtener el cliente_id
    }
  }

  ngOnInit() {
    // Verifica si el cliente está logueado
    if (this.clienteId) {
      this.obtenerCompras();
    }
  }
  obtenerCompras() {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const usuarioObj = JSON.parse(usuario);
      this.clienteId = usuarioObj.cliente_id;
      console.log(this.clienteId);
    }

    this.compraService.getCompras(this.clienteId).subscribe(
      (response) => {
        console.log('Compras del cliente:', response);
        this.compras = response;
        console.log(this.compras);
      },
      (error) => {
        console.error('Error al obtener las compras', error);
      }
    );
  }

  toggleDetalle(idCompra: number) {
    // Alternar la compra seleccionada o cerrar si es la misma
    this.compraSeleccionada = this.compraSeleccionada === idCompra ? null : idCompra;
  }



}
