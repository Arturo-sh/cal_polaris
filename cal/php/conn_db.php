<?php

$servername = "localhost";
$username = "root";
$password = "arturo";
$dbname = "polaris";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Ha ocurrido un error al conectar con la base de datos: " . $conn);
}

?>
