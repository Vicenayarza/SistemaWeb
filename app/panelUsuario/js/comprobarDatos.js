function comprobarDatosIntroducidos() {
    let idJ = document.getElementById("actIDJornada").value; 
    let puntos = document.getElementById("actPuntos").value;
    let encestados = document.getElementById("actEncestados").value;
    let realizados = document.getElementById("actRealizados").value;
    let e = false

    eliminarHijo("idJornada")
    if (comprobarID(idJ)) {
        var er = document.createElement("p")
        er.setAttribute('class', 'text-danger')
        var t = document.createTextNode("La id de la jornada debe tener la forma: JJJJ0000")
        er.setAttribute('id', 'erID')
        er.appendChild(t)
        document.getElementById("idJornada").appendChild(er)
        e = true
    }

    eliminarHijo("puntos")
    if (puntos > 1000 || puntos.length == 0) {
        var er = document.createElement("p")
        er.setAttribute('class', 'text-danger')
        if (puntos.length == 0)
            var t = document.createTextNode("Debes introducir puntos")
        else
            var t = document.createTextNode("Los puntos deben ser menores de 1000")
        er.setAttribute('id', 'erPuntos')
        er.appendChild(t)
        document.getElementById("puntos").appendChild(er)
        e = true
    }

    eliminarHijo("encestados")
    if (encestados.length == 0) {
        var er = document.createElement("p")
        er.setAttribute('class', 'text-danger')
        var t = document.createTextNode("Debes introducir los tiros encestados")
        er.setAttribute('id', 'erEncestados')
        er.appendChild(t)
        document.getElementById("encestados").appendChild(er)
        e = true
    }

    eliminarHijo("realizados")
    if (realizados.length == 0) {
        eliminarHijo("realizados")
        var er = document.createElement("p")
        er.setAttribute('class', 'text-danger')
        var t = document.createTextNode("Debes introducir los tiros realizados")
        er.setAttribute('id', 'erRealizados')
        er.appendChild(t)
        document.getElementById("realizados").appendChild(er)
        e = true
    }

    if (!e) document.createUpdateData.submit();
}

function eliminarHijo(id) {
    var el = document.getElementById(id)
    if (el.lastChild.nodeName == 'P') {
        el.removeChild(el.lastChild)
    }
}

function comprobarID(idJ) { 
    e = false
    i = 0
    if (idJ.length != 8) {
        e = true
    } else {
        while (i < 8 && !e){
            if (i >= 4) {
                if (isNaN(idJ[i])) {
                    e = true
                }
            } else {
                if (!idJ[i].match(/[A-Z]/i)) { //Expresión regular para saber si es una letra entre A-Z
                    e = true
                }
            }
            i++
        }
    }
    return e
}
