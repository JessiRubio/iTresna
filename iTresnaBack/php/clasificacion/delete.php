<?php
    include("./../conexion.php");
    $callback = false;
    if(isset($_GET['callback'])){
        $callback = $_GET['callback'];
    }
    foreach(array_keys($_GET) as $key){
        $$key = $_GET[$key];
    }

    $result = array();
    $result["error"]=1;


    if(isset($cod_org) && $cod_org!="" && isset($tip_clasificacion) && $tip_clasificacion!="" 
        && isset($categoria) && $categoria!=""){
        $sql="DELETE FROM t_tip_clasificacion
        WHERE cod_org=? AND tip_clasificacion=? AND categoria=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("iss",$cod_org,$tip_clasificacion,$categoria);
        $query->execute();
        $affected_rows=$query->affected_rows;
        $query->close();
        $result["error"]=($affected_rows>0)?0:1;
    }
    echo json_encode($result);