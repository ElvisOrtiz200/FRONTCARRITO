import { Component,Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductosService } from '../services/productos.service';
import { CategoriaService } from '../services/categoria.service';
import { ProductoModel } from '../models/producto.model';
import { CategoriaModel } from '../models/categoria.model';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ClienteModel } from '../models/cliente.model';
import { ClientesService } from '../services/clientes.service';
@Component({
  selector: 'app-agregarcliente',
  templateUrl: './agregarcliente.page.html',
  styleUrls: ['./agregarcliente.page.scss'],
})
export class AgregarclientePage implements OnInit {

  
  edit=false;
  @Input() producto:ClienteModel | undefined;
  categorias:CategoriaModel[] | undefined;
  datos={
    ruc_dni:'',
    nombres:'',
  email:'',
  direccion:''
  } 
  createFormGroup(){
  return new FormGroup({
    ruc_dni: new FormControl('',[Validators.required]),
    nombres: new FormControl(null,[Validators.required]),
    email: new FormControl('',[Validators.required]),
    direccion: new FormControl('',[Validators.required])
  });
  }
  validation_messages = {
  'ruc_dni': [
  { type: 'required', message: 'Escriba Nombre.' }
  ],
  'nombres': [
  { type: 'required', message: 'Seleccione categoria' }
  ],
  'email': [
  { type: 'required', message: 'Escriba precio' }
  ],
  'direccion': [
  { type: 'required', message: 'Escriba cantidad' },
  ]
  }
  registrarForm : FormGroup;

  constructor(private modalCtrl:ModalController,
    private serviceproducto:ClientesService,
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
onSubmit(){
  if (this.edit) {
    // No implementado
  } else {
    const producto = this.registrarForm.value;
    this.serviceproducto.Agregar(producto).subscribe(response => {
      this.modalCtrl.dismiss(response, 'creado');
      console.log(response); // Asegúrate de que aquí esté el producto creado
    });
  }
}



}
