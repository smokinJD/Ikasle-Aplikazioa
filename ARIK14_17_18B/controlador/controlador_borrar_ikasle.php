<?php

require_once '../modelo/modelo_Ikasle.php';
$ikasle_id = $_POST['data']; 
 
$cont = new modelo_ikasle();
$cont->borrar_ikasle($ikasle_id);
print($ikasle_id)
?>