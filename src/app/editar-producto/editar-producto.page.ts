import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CategoriaService } from '../services/categoria.service'; // Asegúrate de importar el servicio
import { ProductoModel } from '../models/producto.model';
import { CategoriaModel } from '../models/categoria.model'; // Asegúrate de que esto esté importado
 
@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.page.html',
  styleUrls: ['./editar-producto.page.scss'],
})
export class EditarProductoPage implements OnInit {
  @Input() producto: ProductoModel | undefined; // Recibir el producto a editar
  categorias: CategoriaModel[] = []; // Definir la propiedad categorias
  registrarForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private categoriaService: CategoriaService // Inyectar el servicio de categorías
  ) {
    this.registrarForm = this.createFormGroup();
  }

  ngOnInit() {
    // Cargar las categorías al iniciar el componente
    this.categoriaService.ObtenerTodos().subscribe(response => {
      this.categorias = response;
    });

    if (this.producto) {
      this.registrarForm.patchValue(this.producto); // Poner los valores del producto en el formulario
    }
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      descripcion: ['', Validators.required],
      idcategoria: [null, Validators.required],
      precio: ['', Validators.required],
      cantidad: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registrarForm.valid) {
      const productoActualizado = { ...this.producto, ...this.registrarForm.value };
      this.modalCtrl.dismiss(productoActualizado); // Cerrar el modal y pasar el producto actualizado
    }
  }

  cerrarModal() {
    this.modalCtrl.dismiss(); // Cerrar el modal sin datos
  }
}
