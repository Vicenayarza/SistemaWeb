function comprobardatos() { //Permite comprobar si todos los elementos del registro están añadidos y son correctos
    let name = document.getElementById("controlName").value;
    let surname = document.getElementById("controlSurname").value;
    let id = document.getElementById("controlDNI").value;
    let tel = document.getElementById("controlTel").value;
    let fecha = document.getElementById("controlFecha").value;
    let email = document.getElementById("controlEmail").value;
    let contra = document.getElementById("controlPass").value;
    let contraRepeat = document.getElementById("controlPassRepeat").value;
    let bank = document.getElementById("controlBankAccount").value;
    let username = document.getElementById("controlUsername").value;
    let e = false;

    eliminarHijos(); //Se eliminan los mensajes de error para que no se amontonen
    
    if (contieneNumeros(name)) {
        var er = document.createElement("p")    //Creamos un elemento p
        er.setAttribute('class', 'text-danger') //Le damos color rojo al texto
        var t = document.createTextNode("El nombre no puede contener números")
        er.setAttribute('id', 'erNombre') //Le damos un id
        er.appendChild(t) //Le añadimos el texto a p
        document.getElementById("c1").appendChild(er) //Colocamos debajo del campo correspondiente el mensaje de error
        e= true
    }
    if (contieneNumeros(surname)) {
        var er = document.createElement("p")
        er.setAttribute('class', 'text-danger')
        var t = document.createTextNode("Los apellidos no pueden tener números")
        er.setAttribute('id', 'erApellido')
        er.appendChild(t)
        document.getElementById("c2").appendChild(er)
        e= true
    }
    if (!esCorrecto(id)) {
        var er = document.createElement("p")
        er.setAttribute('class', 'text-danger')
        var t = document.createTextNode("El DNI no es correcto")
        er.setAttribute('id', 'erDNI')
        er.appendChild(t)
        document.getElementById("c3").appendChild(er)
        e= true
    }

    if (!esFecha(fecha)) {
        var er = document.createElement("p")
        er.setAttribute('class', 'text-danger')
        var t = document.createTextNode("Fecha incorrecta")
        er.setAttribute('id', 'eFecha')
        er.appendChild(t)
        document.getElementById("c5").appendChild(er)
        e= true
    }

    if (!esTel(tel)) {
        var er = document.createElement("p")
        er.setAttribute('class', 'text-danger')
        var t = document.createTextNode("Número incorrecto")
        er.setAttribute('id', 'eTel')
        er.appendChild(t)
        document.getElementById("c4").appendChild(er)
        e= true
    }

    if (!esCorreo(email)) {
        var er = document.createElement("p")
        er.setAttribute('class', 'text-danger')
        var t = document.createTextNode("Correo incorrecto")
        er.setAttribute('id', 'eCor')
        er.appendChild(t)
        document.getElementById("c6").appendChild(er)
        e= true
    }

    if (username.length == 0 || username.length > 9) {
        var er = document.createElement("p")
        er.setAttribute('class', 'text-danger')
        var t = document.createTextNode("El nombre de usuario tiene que tener como máximo 9 caracteres")
        er.setAttribute('id', 'eUsername')
        er.appendChild(t)
        document.getElementById("c7").appendChild(er)
        e= true
    }

    if (!esContraSegura(contra)) {
        var er = document.createElement("p")
        er.setAttribute('class', 'text-danger')
        var t = document.createTextNode("La contraseña debe tener al menos 8 caracteres, con mayúsculas, minúsculas, números y caracteres especiales (. ! $)")
        er.setAttribute('id', 'eContra')
        er.appendChild(t)
        document.getElementById("c8").appendChild(er)
        e= true
    }
    
    if (contra != contraRepeat) {
        var er = document.createElement("p")
        er.setAttribute('class', 'text-danger')
        var t = document.createTextNode("Las contraseñas deben ser iguales")
        er.setAttribute('id', 'eDiferentes')
        er.appendChild(t)
        document.getElementById("c9").appendChild(er)
        e = true
    }

    if (!esCuenta(bank)) {
        var er = document.createElement("p")
        er.setAttribute('class', 'text-danger')
        var t = document.createTextNode("Debes ingresar una cuenta bancaria real")
        er.setAttribute('id', 'eBanca')
        er.appendChild(t)
        document.getElementById("c10").appendChild(er)
        e = true
    }

    if (!e) document.reg.submit(); //Si no existe ningún error se hace submit del form
}

function eliminarHijos() {
    for (var i =1; i< 11; i++) {
        var c = "c" + i
        var elem = document.getElementById(c)
        if (elem.lastChild.nodeName == 'P') {
            elem.removeChild(elem.lastChild);
        }
        
    }
}

function contieneNumeros(pal) {
    if (pal.length == 0) {
        return true;
    } else {
        var b = false;
        var i = 0;
        while (i < pal.length && !b) {
            if (!isNaN(pal[i]) && pal[i] != ' ') b = true
            i++;
        }
        return b
    }
    
}

function esCorrecto (id) { //Comprobación del DNI mediante algoritmo
    if (id.length == 0) {
        return false;
    } else {
        var b = true;
        var eq = ['T','R','W','A','G','M','Y','F','P','D','X','B','N','J','Z','S','Q','V','H','L','C','K','E']
        if (id != "") {
            if (id.length != 9) b = false;
            else {
                let nums = parseInt(id.substring(0,8))
                if (eq[nums % 23] != id.charAt(8)) b = false
            }
        }    
        return b
    }
    

}

function esFecha(f) {
    if (f.length == 0) {
        return false
    } else {
        let fech = Date.now() //Tomamos la fecha de hoy
        let act = new Date(fech) //Creamos un nuevo objeto Date
        let fAct = act.toISOString().substring(0,10) //Cambiamos la fecha a ISO y obtenemos los 11 primeros caracteres
        if (Date.parse(f) >= Date.parse(fAct)) return false //Si la fecha introducida es mayor que la actual return false
        else return true
    }
}

function esTel(t) {
    var b = true
    if (t.length != 9) b = false;
    var i = 0
    while (i < t.length && b) {
        if(isNaN(parseInt(t.charAt(i)))) b = false 
        i++
    }
    return b
}

function esCorreo(em) {
    if (em.length == 0) {
        return false
    } else {
        re=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ //Expresión regular para comprobar que es un correo correcto
        if (re.exec(em)) 
            return true;
        else
            return false;
    }
}

function esCuenta(bank) {
    re = /^(?:(?:IT|SM)\d{2}[A-Z]\d{22}|CY\d{2}[A-Z]\d{23}|NL\d{2}[A-Z]{4}\d{10}|LV\d{2}[A-Z]{4}\d{13}|(?:BG|BH|GB|IE)\d{2}[A-Z]{4}\d{14}|GI\d{2}[A-Z]{4}\d{15}|RO\d{2}[A-Z]{4}\d{16}|KW\d{2}[A-Z]{4}\d{22}|MT\d{2}[A-Z]{4}\d{23}|NO\d{13}|(?:DK|FI|GL|FO)\d{16}|MK\d{17}|(?:AT|EE|KZ|LU|XK)\d{18}|(?:BA|HR|LI|CH|CR)\d{19}|(?:GE|DE|LT|ME|RS)\d{20}|IL\d{21}|(?:AD|CZ|ES|MD|SA)\d{22}|PT\d{23}|(?:BE|IS)\d{24}|(?:FR|MR|MC)\d{25}|(?:AL|DO|LB|PL)\d{26}|(?:AZ|HU)\d{27}|(?:GR|MU)\d{28})$/i;
    //Expresión regular para comprobar que es un IBAN
    if (re.exec(bank))
        return true;
    else
        return false;
}

function esContraSegura(contra) {
    re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}[^'\s]/
    if (re.exec(contra))
        return true;
    else
        return false;
}

/////////////////////////////////// Funciones individuales para cambiarDatos.php ///////////////////////////////////

function comprobarCorreo() {
    eliminarHijo('correo')
    let e = false;
    let email = document.getElementById("actCorreo").value;
    if (!esCorreo(email)) {
        var er = document.createElement("p")
        er.setAttribute('class', 'text-danger')
        var t = document.createTextNode("Correo incorrecto");
        er.setAttribute('id', 'eCor')
        er.appendChild(t)
        document.getElementById('correo').appendChild(er)
        e= true;
    }

    if (!e) document.actCorreo.submit()
}

function comprobarCuenta() {
    eliminarHijo('cuenta')
    let e = false;
    let cuenta = document.getElementById("actCuenta").value
    if (!esCuenta(cuenta)) {
        var er = document.createElement("p")
        er.setAttribute('class', 'text-danger')
        var t = document.createTextNode("Número de cuenta no válido");
        er.setAttribute('id', 'eCuenta')
        er.appendChild(t)
        document.getElementById('cuenta').appendChild(er)
        e= true;
    }
    if (!e) document.actCuenta.submit()
}

function comprobarNumero() {
    eliminarHijo('tlf')
    let e = false;
    let num = document.getElementById("actNum").value
    if(num.length != 9) {
        var er = document.createElement("p")
        er.setAttribute('class', 'text-danger')
        var t = document.createTextNode("Teléfono incorrecto");
        er.setAttribute('id', 'eTlf')
        er.appendChild(t)
        document.getElementById('tlf').appendChild(er)
        e= true;
    }

    if (!e) document.actNum.submit();
}

function comprobarNums(s,elim) {
    eliminarHijo(elim)
    let e = false;
    let num = document.getElementById(s).value
    if(contieneNumeros(num)) {
        var er = document.createElement("p")
        er.setAttribute('class', 'text-danger')
        var t = document.createTextNode("No se pueden poner números");
        er.setAttribute('id', 'eNums')
        er.appendChild(t)
        document.getElementById(elim).appendChild(er)
        e= true;
    }

    if (!e && s == "actApellidos") document.actApellidos.submit();
    else if (!e && s == "actNombre") document.actNombre.submit();
}

function comprobarFecha() {
    eliminarHijo('fecha')
    let e = false;
    let fecha = document.getElementById("actFecha").value
    if(!esFecha(fecha)) {
        var er = document.createElement("p")
        er.setAttribute('class', 'text-danger')
        var t = document.createTextNode("La fecha no es válida");
        er.setAttribute('id', 'eFecha')
        er.appendChild(t)
        document.getElementById('fecha').appendChild(er)
        e= true;
    }

    if (!e) document.actFecha.submit();
}

function comprobarDNI() {
    eliminarHijo('dni')
    let e = false;
    let dni = document.getElementById("actDni").value
    if(!esCorrecto(dni)) {
        var er = document.createElement("p")
        er.setAttribute('class', 'text-danger')
        var t = document.createTextNode("El DNI no es correcto");
        er.setAttribute('id', 'eDni')
        er.appendChild(t)
        document.getElementById('dni').appendChild(er)
        e= true;
    }

    if (!e) document.actDni.submit();
}

function comprobarNombreUsuario() {
    eliminarHijo('nomUsuario')
    let e = false;
    let username = document.getElementById("actUsername").value
    if(username.length > 9 || username.length == 0) {
        var er = document.createElement("p")
        er.setAttribute('class', 'text-danger')
        var t = document.createTextNode("El nombre de usuario puede tener 9 caracteres como máximo");
        er.setAttribute('id', 'eNomUsuario')
        er.appendChild(t)
        document.getElementById('nomUsuario').appendChild(er)
        e= true;
    }

    if (!e) document.actUsername.submit();
}

function comprobarContra() {
    eliminarHijo('contraNueva')
    let e = false
    let contraNueva = document.getElementById("actContraNueva").value
    let contraVieja = document.getElementById("actContraAct").value
    if (!esContraSegura(contraNueva)) {
        var er = document.createElement("p")
        er.setAttribute('class', 'text-danger')
        var t = document.createTextNode("La contraseña debe tener al menos 8 caracteres, con mayúsculas, minúsculas, números y caracteres especiales (. ! $)");
        er.setAttribute('id', 'eContraNueva')
        er.appendChild(t)
        document.getElementById("contraNueva").appendChild(er)
        e = true
    } else if (contraVieja == contraNueva) {
        var er = document.createElement("p")
        er.setAttribute('class', 'text-danger')
        var t = document.createTextNode("Las contraseñas no pueden ser iguales");
        er.setAttribute('id', 'eContraNueva')
        er.appendChild(t)
        document.getElementById("contraNueva").appendChild(er)
        e = true
    }

    if (!e) document.actContra.submit();
}



function eliminarHijo(id) {
    var el = document.getElementById(id)
    if (el.lastChild.nodeName == 'P') {
        el.removeChild(el.lastChild)
    }
}



