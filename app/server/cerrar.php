<?php
session_start();
unset($_SESSION['username']);
session_destroy();
session_unset();
header('Location: ../index.php');
?>
