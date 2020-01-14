<?php
    require_once("./../conexion.php");
    
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    $cod_org=$data->cod_org;
    $desc_esp=$data->desc_esp;
    $ind_esp_curacion=$data->ind_esp_curacion;
    $orden=$data->orden;

    if($cod_org!="" && $orden!="" && $desc_esp!="" && $ind_esp_curacion!=""){
        if($orden==0){

        }else{
            $sql="SELECT MAX(orden)
                FROM t_espacios
                WHERE cod_org=?";
            $query=$conexion->prepare($sql);
            
        }
    }
?>