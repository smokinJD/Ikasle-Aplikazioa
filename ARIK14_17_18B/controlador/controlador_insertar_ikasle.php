<?php

require_once '../modelo/modelo_Ikasle.php';
$json = $_POST['data'];

$datos = json_decode($json);

$nombre = $datos->Nombre;
$edad = $datos->Edad;
$curso = $datos->Curso;
$modulos = $datos->arrayModulos;

$cont = new modelo_ikasle();
$cont->insertar_ikasle($nombre,$edad,$curso);

$cont2 = new modelo_ikasle();
foreach ($modulos as $modulo){
    echo ($modulo->id_modulo);
    
}

print($nombre)
?>