import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  user: any = null;  // Variable para almacenar los datos del usuario

  constructor(private authService: UsuarioService) {}

  ngOnInit() {
    this.getUserData();  // Obtener los datos del usuario cuando se cargue el componente
  }

  // Obtener los datos del usuario desde el servicio
  getUserData() {
    this.user = this.authService.getUser();  // Cargar la información del usuario
  }

  // Cerrar sesión
  logout() {
    this.authService.logout();  // Llamamos al servicio para cerrar sesión
    this.user = null;  // Limpiamos los datos del usuario
  }
}
