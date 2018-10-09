const expect = chai.expect;

describe('Eliminar un horario al ser reservado', function(){
  let restaurant = listado.buscarRestaurante(1);    
  it('Se debe eliminar un horario del arreglo.',function(){
    restaurant.horarios = ['13:00', '15:30', '18:00']   
    restaurant.reservarHorario('18:00');
		expect(restaurant.horarios).to.be.an('array').that.does.not.include('18:00');      
  })
  it('Se debe mantener el arreglo si se reserva un horario que no posee.',function(){   
    restaurant.horarios = ['12:30', '14:30', '15:00']    
    restaurant.reservarHorario('19:00');
		expect(restaurant.horarios).to.be.an('array').to.eql(['12:30', '14:30', '15:00']);      
  })
  it('Se debe mantener el arreglo si no se pasa un horario.',function(){   
    restaurant.reservarHorario();
		expect(restaurant.horarios).to.be.an('array').to.eql(['12:30', '14:30', '15:00']);      
  })
  it('La cantidad de elementos del arreglo disminuye.',function(){   
    let cantidadAntesDeModificacion = restaurant.horarios.length;           
    restaurant.reservarHorario('12:30');
		expect(restaurant.horarios.length).to.be.equal(cantidadAntesDeModificacion - 1);      
	})
});

describe('Calcular el promedio de calificaciones', function(){
  let restaurant = listado.buscarRestaurante(1);
  restaurant.calificaciones = [6, 7, 9, 10, 5];       
  it('Se debe calcular correctamente el promedio de calificaciones.',function(){
    expect(restaurant.obtenerPuntuacion()).to.be.equal(7.4);
  })
  it('Debe devolver cero para un restaurant sin calificaciones.',function(){
    restaurant.calificaciones = [];
    expect(restaurant.obtenerPuntuacion()).to.be.equal(0);    
  })
});

describe('Calificar un restaurant', function(){
  let restaurant = listado.buscarRestaurante(1);  
  it('Se debe agregar la nueva calificacion al arreglo.',function(){
    restaurant.calificaciones = [6, 7, 9, 10, 5];         
    restaurant.calificar(6);
    expect(restaurant.calificaciones).to.be.an('array').to.eql([6, 7, 9, 10, 5, 6]);
  })
  it('No debe agregar al arreglo elementos que no sean números enteros mayores a cero y menores a diez.',function(){
    restaurant.calificaciones = [6, 7, 9, 10, 5];             
    restaurant.calificar(0);
    expect(restaurant.calificaciones).to.be.an('array').to.eql([6, 7, 9, 10, 5]);
    restaurant.calificar(11);
    expect(restaurant.calificaciones).to.be.an('array').to.eql([6, 7, 9, 10, 5]);
    restaurant.calificar('hola');
    expect(restaurant.calificaciones).to.be.an('array').to.eql([6, 7, 9, 10, 5]);
    restaurant.calificar(-1);
    expect(restaurant.calificaciones).to.be.an('array').to.eql([6, 7, 9, 10, 5]);
  })
});

describe('Obtener restaurantes filtrados a través de la búsqueda', function(){
  it('Debe devolver un arreglo con todos los restaurantes pertenecientes al lugar filtrado.',function(){
    let restaurnatesFiltrados = listado.obtenerRestaurantes(null, 'Berlín', null);    
    expect(restaurnatesFiltrados.length).to.be.equal(5);    
      restaurnatesFiltrados.forEach(element => {
      expect(element['ubicacion']).to.include('Berlín');          
    });
  });
  it('Debe devolver un arreglo con todos los restaurantes pertenecientes al rubro filtrado.',function(){
    let restaurnatesFiltrados = listado.obtenerRestaurantes('Hamburguesa', null, null);    
    expect(restaurnatesFiltrados.length).to.be.equal(4);    
      restaurnatesFiltrados.forEach(element => {
        expect(element['rubro']).to.include('Hamburguesa');
      });
  });
  it('Debe devolver un arreglo con todos los restaurantes pertenecientes al horario filtrado.',function(){
    let restaurnatesFiltrados = listado.obtenerRestaurantes(null, null, '18:00');    
      restaurnatesFiltrados.forEach(element => {
        expect(element.horarios).to.be.an('array').that.includes('18:00');
      });
  });   
  it('Debe devolver un arreglo con todos los restaurantes del listado en caso de no haber ningún filtro aplicado.',function(){
    let restaurnatesFiltrados = listado.obtenerRestaurantes(null, null, null);        
    expect(restaurnatesFiltrados).to.be.an('array');    
    expect(restaurnatesFiltrados.length).to.be.equal(24);    
  });
});
