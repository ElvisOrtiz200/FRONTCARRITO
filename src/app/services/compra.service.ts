import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private apiUrl = 'http://localhost:8000/api/compras'; // Asegúrate de que esta sea la URL de tu backend

  constructor(private http: HttpClient) { }

  // Enviar los productos del carrito y el cliente al backend para crear una compra
  realizarCompra(data: any): Observable<any> {
    console.log('el error surge eaca   '+data);
    return this.http.post(this.apiUrl, data);
  }

  // Obtener compras por cliente_id
  getCompras(clienteId: number): Observable<any> {
    console.log(clienteId);
    return this.http.get(`${this.apiUrl}/${clienteId}`);
  }
}
