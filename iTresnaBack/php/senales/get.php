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
    $result["etiquetas"] = array();
    $result["usuarios"] = array();
    if(isset($cod_usuario) && $cod_usuario!="" &&isset($cod_org) 
        && $cod_org !="" && isset($cod_esp) && $cod_esp!="" && isset($cod_cop) 
        && $cod_cop!=""){
        $sql= "SELECT cod_senal,cod_org,cod_esp,cod_cop,cod_etiqueta,
                      desc_senal,enlace,fecha_hora, cod_usuario,ind_fich_gest
                FROM t_senales
                WHERE cod_org = ? AND cod_esp = ? AND cod_cop = ?
                ORDER BY fecha_hora DESC";
        $query=$conexion->prepare($sql);
        $query->bind_param("ddd",$cod_org,$cod_esp,$cod_cop);
        $query->execute();
        $query->bind_result($cod_senal,$cod_org,$cod_esp,$cod_cop,
                            $cod_etiqueta,$desc_senal,$enlace,$fecha_hora,
                            $cod_usuario_senal,$ind_fich_gest);
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
                "cod_usuario" => $cod_usuario_senal,
                "ind_fech_gest" => $ind_fich_gest,
                "cantidad_comentarios" => cantidadComentarios($cod_org,$cod_esp,$cod_cop,$cod_senal),
                "me_gustas" => meGustas($cod_org,$cod_esp,$cod_cop,$cod_senal),
                "me_ha_gustado" => meHaGustado($cod_org,$cod_esp,$cod_cop,$cod_senal,$cod_usuario)
            );
        }  
        $result["error"]=0;
        $query->close();
    }
    
    echo json_encode($result);
    function meGustas($cod_org,$cod_esp,$cod_cop,$cod_senal){
        $result=0;
        include("./../conexion.php");
        $sql="SELECT COUNT(*)
        FROM t_megusta
        WHERE cod_org=? AND cod_esp=? AND cod_cop=? AND cod_senal=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("dddd",$cod_org,$cod_esp,$cod_cop,$cod_senal);
        $query->execute();
        $query->bind_result($cantidad);
        $query->fetch();
        $result=$cantidad;
        $query->close();
        return $result;
    }
    function meHaGustado($cod_org,$cod_esp,$cod_cop,$cod_senal,$cod_usuario):bool{
        include("./../conexion.php");
        $sql="SELECT COUNT(*)
        FROM t_megusta
        WHERE cod_org=? AND cod_esp=? AND cod_cop=? AND cod_senal=? AND cod_usuario=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("dddds",$cod_org,$cod_esp,$cod_cop,$cod_senal,$cod_usuario);
        $query->execute();
        $query->bind_result($cantidad);
        $query->fetch();
        $result=$cantidad;
        $query->close();
        return $result==1;
    }
    function cantidadComentarios($cod_org,$cod_esp,$cod_cop,$cod_senal){
        include("./../conexion.php");
        $sql="SELECT COUNT(*)
                FROM t_comentarios
                WHERE cod_org=? AND cod_esp=? AND cod_cop=? AND cod_senal=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("dddd",$cod_org,$cod_esp,$cod_cop,$cod_senal);
        $query->execute();
        $query->bind_result($cantidad);
        $query->fetch();
        $result=$cantidad;
        $query->close();
        return $result;
    }
    
?>