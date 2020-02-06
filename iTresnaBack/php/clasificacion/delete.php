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


    if(isset($categoria) && $categoria!="" && isset($cod_org) && $cod_org!="" && isset(~$cod_tip) && $cod_tip!=""){
        $sql="DELETE FROM t_tip_clasificacion
        WHERE cod_org=? AND cod_tip=? AND categoria=?";
    $query=$conexion->prepare($sql);
    $query->bind_param("iis",$cod_org,$cod_tip.$categoria);
    $query->execute();
    $affected_rows=$query->affected_rows;
    $query->close();
    $result["error"]=($affected_rows>0)?0:1;


    }


    
?>