<?php
    require_once("./../conexion.php");
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $result=array();
    $result["error"]=1;
    $categoria = $data->categoria;
    $cod_tip = $data->cod_tip;
    $cod_org = $data->cod_org;
    if(isset($categoria) && $categoria!="" && isset($cod_org) 
        && $cod_org!="" && isset($cod_tip) && $cod_tip!=""){

        $sql="UPDATE t_tip_clasificacion
                        SET categoria=?
                        WHERE cod_org=? AND cod_tip=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("sii",$categoria,$cod_org,$cod_tip);
        $query->execute();
        $affected_rows=$query->affected_rows;
        $result["error"]=($affected_rows==1)?0:1;
    }
    echo json_encode($result);