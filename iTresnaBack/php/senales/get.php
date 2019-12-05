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
    if(isset($cod_org) && $cod_org !="" && isset($cod_esp) && $cod_esp!="" && isset($cod_cop) && $cod_cop!=""){
        $sql= "SELECT cod_senal,cod_senal,cod_org,cod_esp,cod_cop,cod_etiqueta,
                      desc_senal,enlace,fecha_hora cod_usuario,ind_fich_gest
                FROM t_senales
                WHERE cod_org = ? AND cod_esp = ? AND cod_cop = ?";
        $query=$conexion->prepare($sql);
        $query->bind_param("ddd",$cod_org,$cod_esp,$cod_cop);
        $query->execute();
        $query->bind_result($cod_senal,$cod_org,$cod_esp,$cod_cop,
                            $cod_etiqueta,$desc_senal,$enlace,$fecha_hora,
                            $cod_usuario,$ind_fich_gest);
        while ($query->fetch()){
            $result["senales"][]=array(
                "cod_senal" => $cod_senal,
                "cod_org" => $cod_org,
                "cod_esp" => $cod_esp,
                "cod_cop" => $cod_cop,
                "cod_etiqueta" => $cod_etiqueta,
                "desc_senal" => $desc_senal,
                "enlace" => $enlace,
                "fecha_hora" => $fecha_hora,
                "cod_usuario" => $cod_usuario,
                "ind_fech_gest" => $ind_fich_gest
            );
        }      
        $result["error"]=0;
    }
    echo json_encode($result);
?>