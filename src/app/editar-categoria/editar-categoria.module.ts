import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarCategoriaPageRoutingModule } from './editar-categoria-routing.module';

import { EditarCategoriaPage } from './editar-categoria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditarCategoriaPageRoutingModule
  ],
  declarations: [EditarCategoriaPage]
})
export class EditarCategoriaPageModule {}
