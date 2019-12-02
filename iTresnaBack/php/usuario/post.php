<?php

    require_once("./../conexion.php");
    $json = file_get_contents('php://input');
        $data = json_decode($json);
        $password=$data->password;
        $usuario=$data->usuario;
        $result=array(
            "error"=>1,
            "usuario"=>array()
        );
        if(isset($usuario) && $usuario!="" && isset($password) && $password!=""){
            $sql="SELECT *
                FROM t_usuarios
                WHERE cod_usuario=? and sarbidea=?";
            $query=$conexion->prepare($sql);
            $query->bind_param("ss",$usuario,$password);
            $query->execute();
            $query->bind_result($cod_usuario,$tip_usuario,$cod_org,$sarbidea,$nombre,$ape1,$ape2);
            $query->fetch();
            $result["usuario"]=array(
                "cod_usuario"=>$cod_usuario,
                "tip_usuario"=>$tip_usuario,
                "cod_org"=>$cod_org,
                "sarbidea"=>$sarbidea,
                "nombre"=>$nombre,
                "ape1"=>$ape1,
                "ape2"=>$ape2,
                "permisos"=>obtenerPermisos($cod_usuario)
            );  
            $result["error"] = 0;
        }
    echo json_encode($result);
    
    function obtenerPermisos($cod_usuario){
        include("./../conexion.php");
        $result=array();
            if(isset($cod_usuario) && $cod_usuario!=""){
                $sql="SELECT *
                    FROM t_permisos
                    WHERE cod_usuario=?
                    ORDER BY cod_org,cod_esp,cod_cop";
                $query=$conexion->prepare($sql);
                $query->bind_param("s",$cod_usuario);
                $query->execute();
                $query->bind_result($basura,$cod_org,$cod_esp,$cod_cop,$ind_admin);
                while($query->fetch()){
                    
                    $result[]=array(
                        "cod_org"=>$cod_org,
                        "cod_esp"=>$cod_esp,
                        "cod_cop"=>$cod_cop,
                        "ind_admin"=>$ind_admin==1
                    );    
                }                 
            }
        return $result;
    }
?>