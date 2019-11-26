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
    if(isset($usu_cod_org) && $usu_cod_org !=""){
        $sql= "SELECT *
                FROM t_espacios
                WHERE cod_org = ?";

        $query=$conexion->prepare($sql);
        $query->bind_param("d",$usu_cod_org);
        $query->execute();
        $query->bind_result($cod_org,$cod_esp,$desc_esp,$ind_esp_curacion);
        while ($query->fetch()){
            $result["espacios"][]=array(
                "cod_org" => $cod_org,
                "cod_esp" => $cod_esp,
                "desc_esp" => $desc_esp,
                "ind_esp_curacion" => $ind_esp_curacion,

            );
            $result["error"]=0;

        }        
    }
    echo json_encode($result);
?>