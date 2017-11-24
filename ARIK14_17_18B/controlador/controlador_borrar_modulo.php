<?php

require_once '../modelo/modelo_moduluak.php';
$modulo_id = $_POST['data']; 
 
$cont = new modelo_moduluak();
$cont->borrar_modulo($modulo_id);
print($modulo_id)
?>