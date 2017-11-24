<?php
require_once '../controlador/conector.php';
class modelo_moduluak{
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
    
    public function insertar_modulo($nombre,$curso){
        $consulta=$this->link->query("INSERT INTO moduluak(Nombre, Curso) VALUES ('$nombre','$curso');");

    } 
    
    public function modificar_modulo($id, $nombre,$curso){
        $consulta=$this->link->query("UPDATE moduluak SET Nombre='$nombre', Curso='$curso' WHERE id_modulo='$id';");

    }
    
     public function borrar_modulo($id){
        $consulta=$this->link->query("DELETE FROM `moduluak` WHERE id_modulo='$id';");

    }
}
?>