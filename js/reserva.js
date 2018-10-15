class Reserva {
  constructor (horario, cantidad, precio, descuento) {
    this.horario = horario;
    this.cantidad = cantidad;
    this.precio = precio;
    this.descuento = descuento;
  }

  calcularPrecioBase () {
    return this.cantidad * this.precio;
  }

  calcularPrecioFinal () {
    let precioBase = this.calcularPrecioBase();
    let descuentos = this.calcularDescuentos(precioBase);
    let adicionales = this.calcularAdicionales(precioBase);    
    return precioBase + adicionales - descuentos;
  }

  calcularAdicionales (precioBase) {
    let primerAdicional, segundoAdicional;
      if ((this.horario.getHours() === 13 || this.horario.getHours() === 20 )) {
        primerAdicional = precioBase * 0.05; 
      }else{
        primerAdicional = 0;
      }
      if (this.horario.getDay() === 0 || this.horario.getDay() === 5 || this.horario.getDay() === 6) {
        segundoAdicional = precioBase * 0.1;
      }else{
        segundoAdicional = 0;
      }
    return primerAdicional + segundoAdicional;
  }

  calcularDescuentos (precioBase) {
    let primerDescuento, segundoDescuento;
    
    if (this.cantidad >= 4 && this.cantidad < 6) {
      primerDescuento = precioBase * 0.05;
      }else if (this.cantidad >= 6 && this.cantidad < 8) {
        primerDescuento = precioBase * 0.1;      
      }else if (this.cantidad >= 8) {
        primerDescuento = precioBase * 0.15;      
      }else{
        primerDescuento = 0;
    }
    switch (this.descuento) {
      case 'DES15':
        segundoDescuento = precioBase * 0.15;
        break;
      case 'DES200':
        segundoDescuento = 200;        
        break;      
      case 'DES1':
        segundoDescuento = this.precio;        
        break;      
      default:
        segundoDescuento = 0; 
        break;
    }
    return primerDescuento + segundoDescuento;   
  }
}    

