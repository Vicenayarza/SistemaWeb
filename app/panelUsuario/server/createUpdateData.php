<?php
session_start();
$username = $_SESSION['username'];
$db = mysqli_connect('172.17.0.2:3306', 'admin', 'test', 'database');
$jornadaAct = $_SESSION['jornadaAct'];
$numJ = $_POST['actIDJornada'];
$liga = $_POST['actLiga'];
$puntos = $_POST['actPuntos'];
$encestados = $_POST['actEncestados'];
$realizados = $_POST['actRealizados'];

if ($jornadaAct == null) { //Si no existe partida actual --> Creando jornada nueva
    $query = "SELECT * FROM jornada WHERE nombreUsuario = '$username' AND num_jornada = '$numJ';";
    $res = mysqli_query($db,$query);
    $jornada = mysqli_fetch_assoc($res);
    if ($jornada) { //Si existe partida con el código introducido --> error
        $_SESSION['errorJornadaExiste'] = true;
        $_SESSION['numJ'] = $numJ; //Enviamos de vuelta los datos introducidos previamente
        $_SESSION['liga'] = $liga;
        $_SESSION['puntos'] = $puntos;
        $_SESSION['encestados'] = $encestados;
        $_SESSION['realizados'] = $realizados;
        $_SESSION['jornadaAnt'] = $jornadaAct;
        header('location: ../modificar.php');
    } else {
        $query = "INSERT INTO jornada VALUES ('$numJ', '$liga', '$puntos', '$encestados', '$realizados', '$username');"; //Añadimos jornada
        mysqli_query($db,$query);
        unset($_SESSION['errorJornadaExiste']);
        header('location: ../jornadasGuardadas.php');
    }
} else { //Si existe partida actual --> Editando partida
    $query = "SELECT * FROM jornada WHERE nombreUsuario = '$username' AND num_jornada = '$numJ';";
    $res = mysqli_query($db,$query);
    $jornada = mysqli_fetch_assoc($res);
    if ($jornada) { //Si existe parida con el código introducido --> buscar si se han hecho cambios
        $query = "SELECT * FROM jornada WHERE nombreUsuario = '$username' AND num_jornada = '$numJ' AND liga = '$liga' AND encestados = '$encestados' AND puntos = '$puntos' AND realizados = '$realizados';";
        $res = mysqli_query($db, $query);
        $jornada = mysqli_fetch_assoc($res);
        if ($jornada) { //Si no existen cambios --> error
            $_SESSION['errorJornadaExiste'] = true;
            $_SESSION['numJ'] = $numJ;  //Enviamos de vuelta todos los datos ya introducidos previamente
            $_SESSION['liga'] = $liga;
            $_SESSION['puntos'] = $puntos;
            $_SESSION['encestados'] = $encestados;
            $_SESSION['realizados'] = $realizados;
            $_SESSION['jornadaAnt'] = $jornadaAct;
            header('location: ../modificar.php');
        } else { //Si se han hecho cambios --> actualizar datos partida
            $query = "UPDATE jornada SET num_jornada = '$numJ', liga = '$liga', puntos='$puntos', encestados = '$encestados', realizados = '$realizados' WHERE nombreUsuario = '$username' AND num_jornada = '$jornadaAct';";
            unset($_SESSION['errorJornadaExiste']);
            mysqli_query($db,$query);
            header('location: ../jornadasGuardadas.php');
        }
    } else { //Si la jornada no existe --> actualizar jornada con datos nuevos 
        $query = "UPDATE jornada SET num_jornada = '$numJ', liga = '$liga', puntos='$puntos', encestados = '$encestados', realizados = '$realizados' WHERE nombreUsuario = '$username' AND num_jornada = '$jornadaAct';";
        unset($_SESSION['errorJornadaExiste']);
        mysqli_query($db,$query);
        header('location: ../jornadasGuardadas.php');
    }
}
?>
