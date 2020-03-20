<?php

    require_once("./../conexion.php");
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    
    $result=array(
        "error"=>1,
        "usuario"=>array()
    );


    $accion = $data->accion;

    if($accion!="" && $accion=="nuevo_usuario"){

        $sarbidea=$data->sarbidea;
        $tip_usuario=$data->tip_usuario;
        $cod_org=$data->cod_org;
        $nombre = $data->nombre;
        $ape1=$data->ape1;
        $ape2=$data->ape2;
        $cod_usuario=$data->cod_usuario;

        if(isset($cod_usuario) && $cod_usuario!=""){
            if(!existeUsuario($cod_usuario)){
                include("./../conexion.php");
                $sql="INSERT INTO t_usuarios(cod_usuario,tip_usuario,cod_org,sarbidea,nombre,ape1,ape2)
                    VALUES(?,?,?,?,?,?,?)";
                $query=$conexion->prepare($sql);
                $query->bind_param("siissss",$cod_usuario,$tip_usuario,$cod_org,$sarbidea,$nombre,$ape1,$ape2);
                $query->execute();
                $query->close();
                $result["error"]=0;
            }else{
                $result["error"]=2;
            }
        }
    }else if($accion!="" && $accion=="nuevo_permiso"){
        $cod_org=$data->cod_org;
        $cod_usuario=$data->cod_usuario;
        $cod_cop=$data->cod_cop;
        $ind_admin=$data->ind_admin;
        $cod_esp=$data->cod_esp;


        include("./../conexion.php");
        $sql="INSERT INTO t_permisos(cod_usuario,cod_cop,cod_esp,cod_org,ind_admin)
            VALUES(?,?,?,?,?)";
        $query=$conexion->prepare($sql);
        $query->bind_param("siiii",$cod_usuario,$cod_cop,$cod_esp,$cod_org,$ind_admin);
        $query->execute();
        $query->close();
        $result["error"] = 0;
    }
    else{
        $password=$data->password;
        $usuario=$data->usuario;
        if(isset($usuario) && $usuario!="" && isset($password) && $password!=""){
            $sql="SELECT cod_usuario,tip_usuario,cod_org,sarbidea,nombre,ape1,ape2
                FROM t_usuarios
                WHERE cod_usuario=? and sarbidea=?";
            $query=$conexion->prepare($sql);
            $query->bind_param("ss",$usuario,$password);
            $query->execute();
            $query->bind_result($cod_usuario,$tip_usuario,$cod_org,$sarbidea,$nombre,$ape1,$ape2);
            $query->fetch();
            if($cod_usuario!=null){
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
        }
    }

    echo json_encode($result);
    function existeUsuario($cod_usuario){
        include("./../conexion.php");
        $sql = "SELECT COUNT(*)
                FROM t_usuarios
                WHERE cod_usuario=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("s",$cod_usuario);
        $query->execute();
        $query->bind_result($cantidad);
        $query->fetch();
        $query->close();
        return ($cantidad>0);
    }

    function obtenerPermisos($cod_usuario){
        include("./../conexion.php");
        $result=array();
            if(isset($cod_usuario) && $cod_usuario!=""){
                $sql="SELECT cod_org,cod_esp,cod_cop,ind_admin
                    FROM t_permisos
                    WHERE cod_usuario=?
                    ORDER BY cod_org,cod_esp,cod_cop";
                $query=$conexion->prepare($sql);
                $query->bind_param("s",$cod_usuario);
                $query->execute();
                $query->bind_result($cod_org,$cod_esp,$cod_cop,$ind_admin);
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