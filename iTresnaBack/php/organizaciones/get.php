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
        $sql="SELECT cod_org,desc_org,img_org,enlace_org,eslogan_org,clasif1,clasif2,clasif3
            FROM t_org
            WHERE cod_org=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("i",$cod_org);
        $query->execute();
        $query->bind_result($cod_org,$desc_org,$img_org,$enlace_org,$eslogan_org,$clasif1,$clasif2,$clasif3);
        $query->fetch();
        $result["organizacion"]=array(
            "cod_org"=>$cod_org,
            "desc_org"=>$desc_org,
            "img_org"=>$img_org,
            "enlace_org"=>$enlace_org,
            "eslogan_org"=>$eslogan_org,
            "clasif1"=>$clasif1,
            "clasif2"=>$clasif2,
            "clasif3"=>$clasif3,
            "categorias"=>cargarCategorias($cod_org)
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
            );
        }
        $result["error"]=0;
    }
    
    
    echo json_encode($result);

    function cargarCategorias($cod_org){
        $result=array();
        include("./../conexion.php");
        $sql="SELECT categoria, tip_clasificacion
                FROM t_tip_clasificacion
                WHERE cod_org=? 
                ORDER BY tip_clasificacion";
        $query=$conexion->prepare($sql);
        $query->bind_param("i",$cod_org);
        $query->execute();
        $query->bind_result($categoria, $tip_clasificacion);
        while($query->fetch()){
            $result[]=array(
                "categoria" => $categoria,
                "tip_clasificacion" => $tip_clasificacion
            );
        }
        $query->close();
        return $result;
    }
?>