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
    if(isset($cod_org) && $cod_org!=""){
        $sql="SELECT cod_org,desc_org,img_org,enlace_org,eslogan_org
            FROM t_org
            WHERE cod_org=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("i",$cod_org);
        $query->execute();
        $query->bind_result($cod_org,$desc_org,$img_org,$enlace_org,$eslogan_org);
        $query->fetch();
        $result["organizacion"]=array(
            "cod_org"=>$cod_org,
            "desc_org"=>$desc_org,
            "img_org"=>$img_org,
            "enlace_org"=>$enlace_org,
            "eslogan_org"=>$eslogan_org,
            "clasificacion"=>cargarClasificacion($cod_org),
            "contacto" => cargarContacto($cod_org),
            "usuarios" =>cargarContactos($cod_org)

        );
        $result["error"]=0;

    }else{
        $sql="SELECT cod_org,desc_org,img_org,enlace_org,eslogan_org
        FROM t_org";
        $query=$conexion->prepare($sql);
        $query->execute();
        $query->bind_result($cod_org, $desc_org, $img_org, $enlace_org, $eslogan_org);
        while($query->fetch()){
            $result["organizaciones"][]=array(
                "cod_org"=>$cod_org,
                "desc_org"=>$desc_org,
                "img_org"=>$img_org,
                "enlace_org"=>$enlace_org,
                "eslogan_org"=>$eslogan_org,
                "clasificacion"=>cargarClasificacion($cod_org),
                "contacto" => cargarContacto($cod_org),
            );
        }
        $result["error"]=0;
    }
    
    
    echo json_encode($result);
    function cargarClasificacion($cod_org){
        include("./../conexion.php");
        $result=array();
        $sql="SELECT clasificacion
                FROM t_clasificacion
                WHERE cod_org=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("i",$cod_org);
        $query->execute();
        $query->bind_result($clasificacion);
        while($query->fetch()){
            $result[]=array(
                "clasificacion"=>$clasificacion,
                "categorias"=>cargarCategorias($cod_org,$clasificacion));
        }
        $query->close();
        return $result;
    }
    function cargarCategorias($cod_org,$tip_clasificacion){
        include("./../conexion.php");
        $result=array();
        $sql="SELECT categoria
                FROM t_tip_clasificacion
                WHERE cod_org=? and tip_clasificacion=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("is",$cod_org,$tip_clasificacion);
        $query->execute();
        $query->bind_result($categoria);
        while($query->fetch()){
            $result[]=$categoria;
        }
        $query->close();
        return $result;
    }

    function cargarContacto($cod_org){
        $result=array();
        include("./../conexion.php");
        $sql="SELECT cod_usuario
                FROM t_usuarios
                WHERE cod_org=? AND tip_usuario=2";
        $query=$conexion->prepare($sql);
        $query->bind_param("i",$cod_org);
        $query->execute();
        $query->bind_result($cod_usuario);
        $query->fetch();
        $result = $cod_usuario;
        $query->close();
        return $result;
    }
    function cargarContactos($cod_org){
        $result=array();
        include("./../conexion.php");
        $sql="SELECT cod_usuario
                FROM t_usuarios
                WHERE cod_org=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("i",$cod_org);
        $query->execute();
        $query->bind_result($cod_usuario);
        while($query->fetch()){
            $result[]=$cod_usuario;
        }
        $query->close();
        return $result;
    }
?>