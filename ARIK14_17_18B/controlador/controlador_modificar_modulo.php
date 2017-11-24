<?php

require_once '../modelo/modelo_moduluak.php';
$id = htmlspecialchars(trim($_POST['id']));
$nombre = htmlspecialchars(trim($_POST['Nombre']));
$curso = htmlspecialchars(trim($_POST['Curso']));
$cont = new modelo_moduluak();
$cont->modificar_modulo($id,$nombre,$curso);
print($nombre)
?>