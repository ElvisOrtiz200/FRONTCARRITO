import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';  // Importa el servicio
import { UsuarioRegister } from 'src/app/models/usuario.model';  // Importa el modelo
interface Cliente {
  cliente_id: number;
  nombres: string;
  apellidos: string;
}
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit{
 // Variables para el formulario
 clientes: Cliente[] = [];
 nombre_usuario!: string;
 contra!: string;
 cliente_id!: number;

 constructor(
   private modalController: ModalController,
   private usuarioService: UsuarioService  // Inyecta el servicio
 ) {}
 ngOnInit() {
  this.cargarClientes(); // Cargamos los clientes al iniciar la página
}
 // Función para cerrar el modal
 dismiss() {
   this.modalController.dismiss();
 }

 cargarClientes() {
  this.usuarioService.getClientes().subscribe(
    (clientes) => {
      this.clientes = clientes; // Guardamos los clientes en la variable
    },
    (error) => {
      console.error('Error al cargar clientes:', error);
    }
  );
}

 // Función para registrar un usuario
 register() {
   if (this.nombre_usuario && this.contra && this.cliente_id) {
     // Llamada al servicio para registrar el usuario
     this.usuarioService.registerUsuario(this.nombre_usuario, this.contra, this.cliente_id).subscribe(
       (response) => {
         console.log('Usuario registrado:', response);
         alert('Usuario registrado con éxito');
         this.dismiss(); // Cierra el modal después de registrar
       },
       (error) => {
         console.error('Error al registrar usuario:', error);
         alert('Hubo un problema al registrar el usuario.');
       }
     );
   } else {
     alert('Por favor, llena todos los campos.');
   }
 }

}
