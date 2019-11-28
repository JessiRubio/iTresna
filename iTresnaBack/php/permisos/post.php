<?php

    require_once("./../conexion.php");
    $json = file_get_contents('php://input');
        $data = json_decode($json);
        $cod_usuario=$data->cod_usuario;
        $result["error"]=1;
        if(isset($cod_usuario) && $cod_usuario!=""){
            $sql="SELECT *
                FROM t_permisos
                WHERE cod_usuario=?";
            $query=$conexion->prepare($sql);
            $query->bind_param("s",$cod_usuario);
            $query->execute();
            $query->bind_result($cod_usuario,$cod_org,$cod_esp,$cod_cop,$ind_admin);
            $query->fetch();
            $result["permisos"][]=array(
                "cod_usuario"=>$cod_usuario,
                "cod_org"=>$cod_org,
                "cod_esp"=>$cod_esp,
                "cod_cop"=>$cod_cop,
                "ind_admin"=>$ind_admin
            );   
            $result["error"]=0;                    
        }
	echo json_encode($result);
?>