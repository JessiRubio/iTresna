<?php
    require_once("./../conexion.php");
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $cod_org=$data->cod_org;
    $clasificacion=$data->clasificacion;
    $categoriaVieja=$data->categoriaVieja;
    $categoriaNueva=$data->categoriaNueva;

    
    $result=array();
    $result["error"]=0;

    if( $cod_org>0 && $clasificacion!="" && $categoriaVieja!=""&& $categoriaNueva!=""){
        $sql="UPDATE t_tip_clasificacion
            SET categoria=?
            WHERE cod_org=? AND tip_clasificacion=? AND categoria=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("siss",$categoriaNueva,$cod_org,$clasificacion, $categoriaVieja);
        $query->execute();
        $affected_rows=$query->affected_rows;
<<<<<<< HEAD
=======
        $query->close();
>>>>>>> 0fb158a6cc33decf3a2e3116839d088798315123
    }
    echo json_encode($result);