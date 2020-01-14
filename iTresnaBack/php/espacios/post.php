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
            $orden=cantidadEspaciosOrg($cod_org);

        }
    }

    function cantidadEspaciosOrg($cod_org){
        $cuantos=0;
        $sql="SELECT COUNT(*)
                FROM t_espacios
                WHERE cod_org=?";
            $query=$conexion->prepare($sql);
            $query->bind_param("i",$cod_org);
            $query->execute();
            $query->bind_result($cuantos);
            $query->fetch();
            $result=$cuantos;
            $query->close();
            return $result;
    }
?>