<?php

    include("./../conexion.php");
    $callback = false;
    if(isset($_GET['callback'])){
        $callback = $_GET['callback'];
    }
    foreach(array_keys($_GET) as $key){
        $$key = $_GET[$key];
    }
    $result=array("error"=>1);
    if(isset($cod_org) && $cod_org!=""){
        $sql="SELECT cod_usuario,cod_org,tip_usuario,nombre,ape1,ape2
            FROM t_usuarios
            WHERE cod_org=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("i",$cod_org);
        $query->execute();
        $query->bind_result($cod_usuario,$cod_org, $tip_usuario, $nombre,
                             $ape1, $ape2);
        while($query->fetch()){
            $result["usuarios"][]=array(
                "cod_usuario"=>$cod_usuario,
                "cod_org"=>$cod_org,
                "tip_usuario"=>$tip_usuario,
                "nombre"=>$nombre,
                "ape1"=>$ape1,
                "ape2"=>$ape2,
                "permisos"=>obtenerPermisos($cod_usuario),
                "clasificacion"=>obtenerDatosClasificatorios($cod_org,$cod_usuario)
            );
        }
        $result["error"]=0;
    }
    else if(isset($cod_usuario) && $cod_usuario!=""){
        $sql="SELECT cod_usuario,cod_org,tip_usuario,nombre,ape1,ape2
            FROM t_usuarios
            WHERE cod_usuario=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("s",$cod_usuario);
        $query->execute();
        $query->bind_result($cod_usuario,$cod_org, $tip_usuario, $nombre,
                             $ape1, $ape2);
        $query->fetch();
        $result["usuario"]=array(
            "cod_usuario"=>$cod_usuario,
            "cod_org"=>$cod_org,
            "tip_usuario"=>$tip_usuario,
            "nombre"=>$nombre,
            "ape1"=>$ape1,
            "ape2"=>$ape2,
            "permisos"=>obtenerPermisos($cod_usuario),
            "clasificacion"=>obtenerDatosClasificatorios($cod_org,$cod_usuario)
        );
        $result["error"]=0;
    }

    echo json_encode($result);

    function obtenerDatosClasificatorios($cod_org,$cod_usuario){
        //Obtener los datos clasificatorios de un usuario a partir de la organizacion
        include("./../conexion.php");
        $result=array();
        $sql="SELECT tip_clasificacion,categoria
                FROM t_clasificacion_usuarios
                WHERE cod_org=? AND cod_usuario=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("is",$cod_org,$cod_usuario);
        $query->execute();
        $query->bind_result($tip_clasificacion,$categoria);
        while($query->fetch()){
            $result[]=array(
                "tip_clasificacion"=>$tip_clasificacion,
                "categoria"=>$categoria
            );    
        } 
        return $result;
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