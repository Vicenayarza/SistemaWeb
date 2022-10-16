function eliminarJornada(comp) {
    let name = comp.id
    if (confirm("¿Estás seguro de que quieres eliminar la jornada " + name + "?")) {
        nombreJornada = "jornada_"+name
        document.getElementById(nombreJornada).submit();
    }
}
