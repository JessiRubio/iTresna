<?php

    include("./../conexion.php");
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $desc_cop=$data->desc_org;
    $imagen=$data->imagen;
    $eslogan=$data->eslogan;
    $result=array(
        "error"=>1,
        "usuario"=>array()
    );
    if($desc_cop!="" && $eslogan!=""){
        $cod_org=getCodOrg();
        echo $cod_org;
    }

    function getCodOrg(){
        include("./../conexion.php");
        $sql="SELECT MAX(cod_org)
            FROM t_org";
        $query=$conexion->prepare($sql);
        $query->execute();
        $query->bind_result($cod_org);
        $query->fetch();
        $query->close();
        return ($cod_org!=null)?($cod_org+1):1;
    }
?>