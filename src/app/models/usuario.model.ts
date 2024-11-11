export class Usuario {
  nombre_usuario: string;
  contra: string;

  constructor(nombre_usuario: string, contra: string) {
    this.nombre_usuario = nombre_usuario;
    this.contra = contra;
  }
}
export class UsuarioRegister {
    nombre_usuario: string;
    contra: string;
    cliente_id: number;
  
    constructor(nombre_usuario: string, contra: string, cliente_id: number) {
      this.nombre_usuario = nombre_usuario;
      this.contra = contra;
      this.cliente_id = cliente_id;
    }
  }