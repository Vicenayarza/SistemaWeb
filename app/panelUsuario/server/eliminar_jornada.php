<?php
session_start();
$nombreJ = htmlspecialchars($_POST['jornada']);
$username = $_SESSION['username'];
$db = mysqli_connect('172.17.0.2:3306', 'admin', 'test', 'database');
$query = "DELETE FROM jornada WHERE num_jornada = '$nombreJ' AND nombreUsuario = '$username';";
mysqli_query($db, $query);
header('location: ../jornadasGuardadas.php');

?>
