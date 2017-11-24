<?php
require_once '../controlador/conector.php';
class modelo_consulta{
    private $link;
    private $usuario;
    
    public function __construct(){
        $this->link=Conectar::conexion();
        $this->usuario=array();
    }
    
    public function get_moduluak(){
        $consulta=$this->link->query("SELECT * FROM moduluak");
        while($filas=$consulta->fetch_assoc()){
            $this->usuario[]=$filas;
        }
        return $this->usuario;
    }
    
    public function get_ikasleak($modulo_elegido){
        $consulta=$this->link->query("SELECT * FROM ikasleak WHERE modulo='$modulo_elegido'");
        while($filas=$consulta->fetch_assoc()){
            $this->usuario[]=$filas;
        }
        return $this->usuario;
    }
}
?>

