<?php 

require_once("../modelo/modelo_consulta.php");
$cont=new modelo_consulta();
$datos=$cont->get_moduluak();

 $Moduluak= json_encode($datos); 
   print $Moduluak;  
?>


