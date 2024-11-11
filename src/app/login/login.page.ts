import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RegistroPage } from '../registro/registro.page';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  nombre_usuario: string = '';
  contra: string = '';
  username = '';
  password = '';
  constructor(private authService: UsuarioService, private router: Router,private modalController: ModalController) {}

  // Método para verificar el usuario
  login() {
    const usuario = { nombre_usuario: this.nombre_usuario, contra: this.contra };
  
    this.authService.verificarUsuario(usuario).subscribe(
      (response) => {
        console.log('Respuesta de la API:', response);  // Agrega este log para verificar la respuesta
        if (response.message === 'Usuario autenticado correctamente') {
          console.log('Usuario autenticado:', response.usuario);  // Verifica que `response.usuario` exista
          this.authService.loginUser(response.usuario);  // Guarda el usuario
          this.router.navigate(['/product']);
        } else {
          alert('Nombre de usuario o contraseña incorrectos');
        }
      },
      (error) => {
        console.error('Error al autenticar', error);
        alert('Error en la autenticación');
      }
    );
  }
  

  async mostrarModal() {
    const modal = await this.modalController.create({
      component: RegistroPage,  // Especificamos la página del modal
    });
    return await modal.present();
  }
  

}
