<?php
    require_once("./../conexion.php");
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $result=array();
    $result["error"]=1;
    $desc_etiqueta = $data->desc_etiqueta;
    $cod_etiqueta = $data->cod_etiqueta;

    if(isset($categoria) && $categoria!="" && isset($cod_org) && $cod_org!="" && isset(~$cod_tip) && $cod_tip!=""){

        $sql="UPDATE t_tip_clasificacion
                        SET categoria=?
                        WHERE cod_org=? AND cod_tip=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("sii",$categoria,$cod_org,$cod_tip);
        $query->execute();
        $result["error"]=0;
    }