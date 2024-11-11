import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {ProductoModel } from '../models/producto.model';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
}) 
export class ProductosService {
  private url='http://localhost:8000/api/productos';
  constructor(private http:HttpClient) { }

  ObtenerTodos(){
    return this.http.get<[ProductoModel]>(this.url);
  }

  Agregar(producto:ProductoModel){
    return this.http.post(this.url,producto);
  }

  Eliminar(idproducto: number): Observable<any> {
    return this.http.put(`${this.url}/eliminar/${idproducto}`, {}); // Ajusta la URL según tu API
  }

  Actualizar(id: number, producto: ProductoModel): Observable<ProductoModel> {
    return this.http.put<ProductoModel>(`${this.url}/${id}`, producto);
  }

}
