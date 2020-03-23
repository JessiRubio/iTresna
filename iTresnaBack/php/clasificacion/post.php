<?php
    include("./../conexion.php");
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    $accion = $data->accion;
    $result=array(
        "error"=>1,
        "aniadido"=>0
    );
    if($accion==="añadir Categoria"){
        $cod_org=$data->cod_org;
        $tip_clasificacion=$data->tip_clasificacion;
        $categoria=$data->categoria;

        $sql = "INSERT INTO t_tip_clasificacion(cod_org,tip_clasificacion,categoria) VALUES(?,?,?)";
        $query=$conexion->prepare($sql);
        $query->bind_param("iss",$cod_org,$tip_clasificacion,$categoria);
        $query->execute();
        $result["error"]=(($query->affected_rows)>0)?0:1;
        $result["aniadido"]=$query->affected_rows;
        $query->close();
    }else if($accion=="nueva_clasificacion"){
        $cod_org=$data->cod_org;
        $clasificacion=$data->clasificacion;

        $sql="INSERT INTO t_clasificacion(cod_org,clasificacion) VALUES(?,?)";
        $query=$conexion->prepare($sql);
        $query->bind_param("is",$cod_org,$clasificacion);
        $query->execute();
        $affected_rows=$query->affected_rows;
        $query->close();
        $result["error"]=($affected_rows==1)?1:0;        
    }
    echo json_encode($result);