<?php

require_once '../modelo/modelo_Ikasle.php';
$id = htmlspecialchars(trim($_POST['id']));
 $nombre = htmlspecialchars(trim($_POST['Nombre']));
 $edad = htmlspecialchars(trim($_POST['Edad']));
 $curso = htmlspecialchars(trim($_POST['Curso']));
$cont = new modelo_ikasle();
$cont->modificar_ikasle($id,$nombre,$edad,$curso);
print($nombre)
?>