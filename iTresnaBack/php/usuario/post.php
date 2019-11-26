<?php

    require_once("./../conexion.php");
    $json = file_get_contents('php://input');
        $data = json_decode($json);
        $password=$data->password;
        $usuario=$data->usuario;
        $result["error"]=1;
        if(isset($usuario) && $usuario!="" && isset($password) && $password!=""){
            $sql="SELECT *
                FROM t_usuarios
                WHERE cod_usuario=? and sarbidea=?";
            $query=$conexion->prepare($sql);
            $query->bind_param("ss",$usuario,$password);
            $query->execute();
            $query->bind_result($cod_usuario,$tip_usuario,$cod_org,$sarbidea,$nombre,$ape1,$ape2);
            $query->fetch();
            $result=array(
                "cod_usuario"=>$cod_usuario,
                "tip_usuario"=>$tip_usuario,
                "cod_org"=>$cod_org,
                "sarbidea"=>$sarbidea,
                "nombre"=>$nombre,
                "ape1"=>$ape1,
                "ape2"=>$ape2,
                "error"=>0
            );                       
        }
	echo json_encode($result);
?>