<?php
    require_once("./../conexion.php");
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $accion=$data->accion;
    $cod_org=$data->cod_org;
    
    $result=array();
    $result["error"]=0;

    if($accion=="Modificar Categoria"){
        $clasificacion=$data->clasificacion;
        $categoriaVieja=$data->categoriaVieja;
        $categoriaNueva=$data->categoriaNueva;
        if( $cod_org>0 && $clasificacion!="" && $categoriaVieja!="" && $categoriaNueva!=""){
            $sql="UPDATE t_tip_clasificacion
                SET categoria = ?
                WHERE cod_org = ? AND tip_clasificacion = ? AND categoria = ?";
            $query=$conexion->prepare($sql);
            $query->bind_param("siss",$categoriaNueva,$cod_org,$clasificacion, $categoriaVieja);
            $query->execute();
            $affected_rows=$query->affected_rows;
            $query->close();
        }
    }else if($accion=="modificar clasificacion"){
        $clasifAntiguo=$data->clasifAntiguo;
        $clasifNuevo=$data->clasifNuevo;

        if($cod_org>0 && $clasifAntiguo!="" && $clasifNuevo!=""){
            $sql="UPDATE t_clasificacion
                SET clasificacion = ?
                WHERE cod_org = ? AND clasificacion = ?";
            $query=$conexion->prepare($sql);
            $query->bind_param("sis",$clasifNuevo,$cod_org,$clasifAntiguo);
            $query->execute();
            $affected_rows=$query->affected_rows;
            $query->close();
            $result["error"]=($affected_rows>0)?0:1;
        }
    }

    echo json_encode($result);