<?php

    require_once("./../conexion.php");
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $desc_cop=$data->desc_org;
    $imagen=$data->imagen;
    $eslogan=$data->eslogan;
    $result=array(
        "error"=>1,
        "usuario"=>array()
    );
    echo $img;
    if($desc_cop!="" && $eslogan!="" && $result!=""){

    }
?>