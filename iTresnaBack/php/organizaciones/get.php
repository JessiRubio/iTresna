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
    $sql="SELECT  cod_org, desc_org, img_org, enlace_org, eslogan_org
    FROM t_org";
    $query=$conexion->prepare($sql);
    $query->execute();
    $query->bind_result($cod_org, $desc_org, $img_org, $enlace_org, $eslogan_org);
    while($query->fetch()){
        $result["organizacion"][]=array(
            "cod_org"=>$cod_org,
            "desc_org"=>$desc_org,
            "img_org"=>$img_org,
            "enlace_org"=>$enlace_org,
            "eslogan_org"=>$eslogan_org,
        );
    }
    
    $result["error"]=0;
    
    echo json_encode($result);
?>