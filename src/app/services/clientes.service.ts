import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {ProductoModel } from '../models/producto.model';
import { Observable } from 'rxjs';
import { ClienteModel } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private url='http://localhost:8000/api/clientes';
  constructor(private http:HttpClient) { }

  ObtenerTodos(){
    return this.http.get<[ClienteModel]>(this.url);
  }

  Agregar(producto:ClienteModel){
    console.log("insertando cliente");
    return this.http.post(this.url,producto);
  }

  Eliminar(idproducto: number): Observable<any> {
    return this.http.put(`${this.url}/eliminar/${idproducto}`, {}); // Ajusta la URL según tu API
  }

  Actualizar(id: number, producto: ClienteModel): Observable<ClienteModel> {
    return this.http.put<ClienteModel>(`${this.url}/${id}`, producto);
  }

}
 