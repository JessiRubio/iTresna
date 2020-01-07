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
    $sql="SELECT cod_org,tip_usuario,nombre,ape1,ape2,
                campo_clasificador1,campo_clasificador2,campo_clasificador3 
        FROM t_usuarios
        WHERE cod_org=?";
    $query=$conexion->prepare($sql);
    $query->bind_param("i",$cod_org);
    $query->execute();
    $query->bind_result($cod_org, $tip_usuario, $nombre,
                         $ape1, $ape2, $campo_clasificador1, 
                         $campo_clasificador2,$campo_clasificador3);
    while($query->fetch()){
        $result["usuarios"][]=array(
            "cod_org"=>$cod_org,
            "tip_usuario"=>$tip_usuario,
            "nombre"=>$nombre,
            "ape1"=>$ape1,
            "ape2"=>$ape2,
            "campo_clasificador1"=>$campo_clasificador1,
            "campo_clasificador2"=>$campo_clasificador2,
            "campo_clasificador3"=>$campo_clasificador1
        );
    }

    $result["error"]=0;
    
    echo json_encode($result);
?>