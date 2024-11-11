import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {CategoriaModel } from '../models/categoria.model';
import { Observable } from 'rxjs';
 

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private url='http://localhost:8000/api/categorias';
    constructor(private http:HttpClient) {
  }

  ObtenerTodos(){
    return this.http.get<[CategoriaModel]>(this.url);
  }
  
  Agregar(categoria:CategoriaModel){
    console.log("insertando categoria");
    return this.http.post(this.url,categoria);
  }

  Eliminar(idproducto: number): Observable<any> {
    return this.http.put(`${this.url}/eliminar/${idproducto}`, {}); // Ajusta la URL según tu API
  }

  Actualizar(id: number, producto: CategoriaModel): Observable<CategoriaModel> {
    return this.http.put<CategoriaModel>(`${this.url}/${id}`, producto);
  }


}
