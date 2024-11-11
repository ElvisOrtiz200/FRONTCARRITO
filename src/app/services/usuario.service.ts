import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root'
})



export class UsuarioService {
  private apiUrl = 'http://127.0.0.1:8000/api/verificar-usuario'; // URL de tu API  
  private apiUrl2 = `${environment.apiUrl}/register`; // Tu ruta de la API
  private clientesUrl = `${environment.apiUrl}/clientes`; 
  
  constructor(private http: HttpClient, private router: Router) {}

  loginUser(user: any) {
    console.log(user);
    localStorage.setItem('usuario', JSON.stringify(user));  // Guardar el usuario
  }

  getUser() {
    const user = localStorage.getItem('usuario');
    console.log('obtengo: '+user)
    return user ? JSON.parse(user) : null;
      // Retorna el usuario si existe, si no, null
  }

  
  logout() {
    // Aquí podemos hacer alguna limpieza de datos, como eliminar datos del usuario en el almacenamiento local (localStorage, por ejemplo)
    localStorage.removeItem('usuario'); // Si estás guardando información del usuario en localStorage
    this.router.navigate(['/login']); // Redirigimos a la página de login
  }

  // Método para verificar si hay un usuario logueado
  isLoggedIn(): boolean {
    return this.getUser() !== null;  // Verifica si existe un usuario
  }

  verificarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }
 

  // Método para registrar un usuario
  registerUsuario(nombre_usuario: string, contra: string, cliente_id: number): Observable<any> {
    const body = {
      nombre_usuario,
      contra,
      cliente_id
    };

    return this.http.post(this.apiUrl2, body); // Realiza la solicitud POST
  }

  // Método para obtener los clientes
  getClientes(): Observable<any> {
    return this.http.get(this.clientesUrl);
  }
}
