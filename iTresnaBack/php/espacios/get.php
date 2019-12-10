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
    if(isset($cod_org) && $cod_org !="" && isset($cod_esp) && $cod_esp!=""){
        $sql= "SELECT cod_esp,cod_org,desc_esp,ind_esp_curacion
        FROM t_espacios
        WHERE cod_org = ? AND cod_esp = ?";
        $query=$conexion->prepare($sql);
        $query->bind_param("dd",$cod_org,$cod_esp);
        $query->execute();
        $query->bind_result($cod_esp,$cod_org_bd,$desc_esp,$ind_esp_curacion);
        $query->fetch();
        $result["espacio"]=array(
            "cod_org" => $cod_org_bd,
            "cod_esp" => $cod_esp,
            "desc_esp" => $desc_esp,
            "ind_esp_curacion" => $ind_esp_curacion,
        );
        $result["error"]=0;
    }
    else if(isset($cod_org) && $cod_org !=""){
        $sql= "SELECT cod_esp,cod_org,desc_esp,ind_esp_curacion
                FROM t_espacios
                WHERE cod_org = ?";
        $query=$conexion->prepare($sql);
        $query->bind_param("d",$cod_org);
        $query->execute();
        $query->bind_result($cod_esp,$cod_org_bd,$desc_esp,$ind_esp_curacion);
        while ($query->fetch()){
            $result["espacios"][]=array(
                "cod_org" => $cod_org_bd,
                "cod_esp" => $cod_esp,
                "desc_esp" => $desc_esp,
                "ind_esp_curacion" => $ind_esp_curacion,

            );
        }
        $result["error"]=0;        
    }
    echo json_encode($result);
?>