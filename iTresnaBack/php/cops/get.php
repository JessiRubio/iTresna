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
    if(isset($cod_org) && $cod_org!="" && isset($cod_esp) && $cod_esp!=""){
        $sql="SELECT cod_cop, desc_cop, img_cop,ind_cop_graficos
                FROM t_cops
                WHERE cod_org=? AND cod_esp=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("dd",$cod_org,$cod_esp);
        $query->execute();
        $query->bind_result($cod_cop,$desc_cop,$img_cop,$ind_cop_graficos);
        while($query->fetch()){
            $result["cops"][]=array(
                "cod_cop"=>$cod_cop,
                "desc_cop"=>$desc_cop,
                "img_cop"=>$img_cop,
                "ind_cop_graficos"=>$ind_cop_graficos
            );
        }
        $result["error"]=0;
    }
    echo json_encode($result);
?>