import { Component,Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductosService } from '../services/productos.service';
import { CategoriaService } from '../services/categoria.service';
import { ProductoModel } from '../models/producto.model';
import { CategoriaModel } from '../models/categoria.model';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-agregarcategoria',
  templateUrl: './agregarcategoria.page.html',
  styleUrls: ['./agregarcategoria.page.scss'],
})
export class AgregarcategoriaPage implements OnInit {
 
  edit=false;
  @Input() producto:CategoriaModel | undefined;
  categorias:CategoriaModel[] | undefined;
  datos={
  descripcion:'',
  } 
  createFormGroup(){
  return new FormGroup({
  descripcion: new FormControl('',[Validators.required]),
  });
  }
  validation_messages = {
  'descripcion': [
  { type: 'required', message: 'Escriba Nombre.' }
  ]
  }
  registrarForm : FormGroup;

  constructor(private modalCtrl:ModalController,
    private serviceproducto:CategoriaService,
    private servicecategoria:CategoriaService,
public formBuilder:FormBuilder) {
this.registrarForm=this.createFormGroup();
}
ngOnInit() {
this.servicecategoria.ObtenerTodos().subscribe(
response=>{
this.categorias=response;
});
}
cerrarModal(){
this.modalCtrl.dismiss(null,'cerrado');
}
onSubmitC(){
  if (this.edit) {
    // No implementado
  } else {
    const categoria = this.registrarForm.value;
    console.log(categoria);
    this.servicecategoria.Agregar(categoria).subscribe(response => {
      this.modalCtrl.dismiss(response, 'creado');
      console.log(response); // Asegúrate de que aquí esté el producto creado
    });
  }
}


}
