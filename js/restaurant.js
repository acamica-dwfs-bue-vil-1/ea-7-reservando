var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function(horarioReservado) {
    let horariosFiltrados = this.horarios.filter(horario => horario !== horarioReservado);
    this.horarios = horariosFiltrados;
}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

function sumatoria (numeros) {
    return numeros.reduce((valorAnterior, valorActual) => valorAnterior + valorActual);
}

function promedio (numeros) {
    let numeroPromedio = sumatoria(numeros) / numeros.length;
    return Math.round(numeroPromedio * 10) / 10;
}

Restaurant.prototype.obtenerPuntuacion = function() {
    if (this.calificaciones.length === 0) {
        return 0;
    } else {
        return promedio(this.calificaciones);
    }

}

