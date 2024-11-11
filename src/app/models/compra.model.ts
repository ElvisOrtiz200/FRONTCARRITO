export interface Producto {
    idproducto: number; // Ahora aseguramos que no puede ser undefined
    descripcion: string; // También aseguramos que no es undefined
    cantidad: number;
    precio: number;
  }
  
  
  export interface Compra {
    cliente_id: number;
    productos: Producto[];
  }
  