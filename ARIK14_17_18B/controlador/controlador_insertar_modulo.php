<?php

require_once '../modelo/modelo_moduluak.php';
$nombre = htmlspecialchars(trim($_POST['Nombre']));
$curso = htmlspecialchars(trim($_POST['Curso']));
$cont = new modelo_moduluak();
$cont->insertar_modulo($nombre,$curso);
print($nombre)
?>