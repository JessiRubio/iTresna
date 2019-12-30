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
    if (isset($cod_org) && $cod_org!="" && isset($cod_esp)
        && $cod_esp!="" && isset($cod_cop) && $cod_cop!=""){
        $sql="SELECT DISTINCT cop.cod_org,cop.cod_esp,cop.cod_cop,cop.desc_cop, cop.img_cop,cop.ind_cop_graficos, COUNT(sen.cod_senal)
                FROM t_cops cop
                LEFT JOIN t_senales sen
                ON cop.cod_org=sen.cod_org 
                AND cop.cod_esp=sen.cod_esp 
                AND cop.cod_cop=sen.cod_cop
                WHERE cop.cod_org=? AND cop.cod_esp=? AND cop.cod_cop=?
                GROUP BY cop.cod_cop, cop.cod_esp, cop.cod_org
                ORDER BY cop.cod_cop";
        $query=$conexion->prepare($sql);
        $query->bind_param("iii",$cod_org,$cod_esp,$cod_cop);
        $query->execute();
        $query->bind_result($cod_org_bd,$cod_esp_bd,$cod_cop_bd,$desc_cop,$img_cop,$ind_cop_graficos,$cantidad_senales);
        $query->fetch();
        $result["cop"]=array(
            "cod_org"=>$cod_org_bd,
            "cod_esp"=>$cod_esp_bd,
            "cod_cop"=>$cod_cop_bd,
            "desc_cop"=>$desc_cop,
            "img_cop"=>$img_cop,
            "ind_cop_graficos"=>$ind_cop_graficos,
            "cantidad_senales"=>$cantidad_senales,
            "etiquetas" => cargarEtiquetas($cod_org,$cod_esp,$cod_cop),
            "usuarios" => cargarUsuariosConAcceso($cod_org,$cod_esp,$cod_cop)
        );

        $result["error"]=0;
    }
    else if(isset($cod_org) && $cod_org!="" && isset($cod_esp) && $cod_esp!="" && isset($cod_usuario) && $cod_usuario!= "" ){
        
        $sql="SELECT DISTINCT cop.cod_org,cop.cod_esp,cop.cod_cop, cop.desc_cop, cop.img_cop,cop.ind_cop_graficos, COUNT(sen.cod_senal)
                FROM t_cops cop
                LEFT JOIN t_senales sen
                ON cop.cod_org=sen.cod_org 
                AND cop.cod_esp=sen.cod_esp 
                AND cop.cod_cop=sen.cod_cop
                WHERE cop.cod_org=? AND cop.cod_esp=?
                GROUP BY cop.cod_cop, cop.cod_esp, cop.cod_org
                ORDER BY cop.cod_cop ASC, (SELECT cod_cop FROM t_permisos WHERE cod_usuario=?
                           AND cod_org=? AND cod_esp=? AND cod_cop=cop.cod_cop) ASC";
        $query=$conexion->prepare($sql);
        $query->bind_param("iisii",$cod_org,$cod_esp,$cod_usuario,$cod_org,$cod_esp);
        $query->execute();
        $query->bind_result($cod_org_bd,$cod_esp_bd,$cod_cop,$desc_cop,$img_cop,$ind_cop_graficos,$cantidad_senales);
        while($query->fetch()){
            $result["cops"][]=array(
                "cod_org"=>$cod_org_bd,
                "cod_esp"=>$cod_esp_bd,
                "cod_cop"=>$cod_cop,
                "desc_cop"=>$desc_cop,
                "img_cop"=>$img_cop,
                "ind_cop_graficos"=>$ind_cop_graficos,
                "cantidad_senales"=>$cantidad_senales
            );
        }
        $result["error"]=0;
    }
    echo json_encode($result);
    function cargarEtiquetas($cod_org,$cod_esp,$cod_cop){
        $result=array();
        include("./../conexion.php");
        $sql="SELECT DiSTINCT(desc_etiqueta), cod_etiqueta
                FROM t_etiquetas
                WHERE cod_org=? AND cod_esp=? AND cod_cop=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("iii",$cod_org,$cod_esp,$cod_cop);
        $query->execute();
        $query->bind_result($desc_etiqueta, $cod_etiqueta);
        while($query->fetch()){
            $result[]=array(
                "cod_etiqueta" => $cod_etiqueta,
                "desc_etiqueta" => $desc_etiqueta
            );
        }
        $query->close();
        return $result;
    }

    function cargarUsuariosConAcceso($cod_org,$cod_esp,$cod_cop){
        $result=array();
        include("./../conexion.php");
        $sql="SELECT DISTINCT tu.cod_usuario
            FROM t_usuarios tu, t_permisos tp 
            WHERE tp.cod_org=? AND tp.cod_esp=? AND tp.cod_cop=? AND tu.cod_usuario = tp.cod_usuario OR tu.tip_usuario=2 AND tu.cod_org=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("iiii",$cod_org,$cod_esp,$cod_cop,$cod_org);
        $query->execute();
        $query->bind_result($cod_usuario);
        while($query->fetch()){
            $result[]=$cod_usuario;
        }
        $query->close();
        return $result;
    }
?>