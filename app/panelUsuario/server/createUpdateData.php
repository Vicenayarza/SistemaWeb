<?php
session_start();
$username = $_SESSION['username'];
$db = mysqli_connect('172.17.0.2:3306', 'admin', 'test', 'database');
$jornadaAct = $_SESSION['jornadaAct'];
$numJ = htmlspecialchars($_POST['actIDJornada'], ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");
$liga = htmlspecialchars($_POST['actLiga'], ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");
$puntos = htmlspecialchars($_POST['actPuntos'], ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");
$encestados = htmlspecialchars($_POST['actEncestados'], ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");
$realizados = htmlspecialchars($_POST['actRealizados'], ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");

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
        $query = "INSERT INTO jornada VALUES (?,?,?,?,?,?);"; //Añadimos jornada
        $stmt = $db -> prepare($query);
        $stmt -> bind_param("ssiiis", $numJ, $liga, $puntos, $encestados, $realizados, $username);
        $stmt -> execute();
        $stmt-> close();
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
            
        } elseif ($jornadaAct == $numJ) { //Si se han hecho cambios --> actualizar datos partida
            $query = "UPDATE jornada SET num_jornada = ?, liga =?, puntos=?, encestados = ?, realizados = ? WHERE nombreUsuario = ? AND num_jornada = ?;";
            $stmt = $db -> prepare($query);
            $stmt -> bind_param("ssiiiss", $numJ, $liga, $puntos, $encestados, $realizados, $username, $jornadaAct);
            $stmt -> execute();
            $stmt-> close();
            unset($_SESSION['errorJornadaExiste']);
            header('location: ../jornadasGuardadas.php');
        }else {
            $_SESSION['errorJornadaExiste'] = true;
            $_SESSION['numJ'] = $numJ;  //Enviamos de vuelta todos los datos ya introducidos previamente
            $_SESSION['liga'] = $liga;
            $_SESSION['puntos'] = $puntos;
            $_SESSION['encestados'] = $encestados;
            $_SESSION['realizados'] = $realizados;
            $_SESSION['jornadaAnt'] = $jornadaAct;
            header('location: ../modificar.php');
        }
    } else { //Si la jornada no existe --> actualizar jornada con datos nuevos (nuevo códido de partida)
        $query = "UPDATE jornada SET num_jornada = ?, liga = ?, puntos=?, encestados = ?, realizados = ? WHERE nombreUsuario = ? AND num_jornada = ?;";
         $stmt = $db -> prepare($query);
        $stmt -> bind_param("ssiiiss", $numJ, $liga, $puntos, $encestados, $realizados, $username, $jornadaAct);
        $stmt -> execute();
        $stmt-> close();
        unset($_SESSION['errorJornadaExiste']);
        header('location: ../jornadasGuardadas.php');
    }
 }
?>
