<?php
require_once '../controlador/conector.php';
class modelo_ikasle{
    private $link;
    private $usuario;
   
    public function __construct(){
        $this->link=Conectar::conexion();
        $this->usuario=array();
         }
   
    public function get_ikasleak(){
       $sql="CALL sp_mostrar_ikasleak()";
       $consulta=$this->link->query($sql);
         while ($row = mysqli_fetch_array($consulta, MYSQLI_ASSOC))
           {
            $this->usuario[]=$row; 
           }
       $consulta->free_result();
       $this->link->close();
       return $this->usuario;
      }
     
    public function insertar_ikasle($nombre,$edad,$curso){
        $consulta=$this->link->query("CALL sp_insertar_ikasle('$nombre', '$edad', '$curso')");

    } 

public function borrar_ikasle($ikasle_id){
        $consulta=$this->link->query("CALL sp_borrar_ikasle('$ikasle_id')");

    } 
 
//public function modificar_ikasle($id,$nombre,$edad,$curso){
     //$consulta=$this->link->query("CALL sp_modificar_ikasle('$id'. '$nombre', '$edad', '$curso')");
//}; 

}
?>
