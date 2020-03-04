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
        $sql= "SELECT sen.cod_senal,sen.cod_org,sen.cod_esp,sen.cod_cop,sen.cod_etiqueta,
                      sen.desc_senal,sen.enlace,sen.fecha_hora,sen.cod_usuario,sen.ind_fich_gest,
                      sen.img_senal,sen.titulo, usu.nombre,usu.ape1,usu.ape2
                FROM t_senales sen
                JOIN t_usuarios usu
                ON sen.cod_usuario=usu.cod_usuario
                WHERE sen.cod_org = ? AND sen.cod_esp = ? AND sen.cod_cop = ?
                ORDER BY ind_fich_gest DESC,fecha_hora DESC";
        $query=$conexion->prepare($sql);
        $query->bind_param("iii",$cod_org,$cod_esp,$cod_cop);
        $query->execute();
        $query->bind_result($cod_senal,$cod_org,$cod_esp,$cod_cop,
                            $cod_etiqueta,$desc_senal,$enlace,$fecha_hora,
                            $cod_usuario_senal, $ind_fich_gest,$img_senal,$titulo,$nombre,$ape1,$ape2);
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
                "nombre_completo" => $nombre." ".$ape1." ".$ape2,
                "cod_usuario"=>$cod_usuario_senal,
                "ind_fech_gest" => ($ind_fich_gest==1),
                "img_senal" => $img_senal,
                "titulo" => $titulo,
                "cantidad_comentarios" => cantidadComentarios($cod_org,$cod_esp,$cod_cop,$cod_senal),
                "me_gustas" => meGustas($cod_org,$cod_esp,$cod_cop,$cod_senal),
                "me_ha_gustado" => meHaGustado($cod_org,$cod_esp,$cod_cop,$cod_senal,$cod_usuario),
                "desc_etiqueta" => buscarEtiqueta($cod_org,$cod_esp,$cod_cop,$cod_etiqueta)
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
        $query->bind_param("iiii",$cod_org,$cod_esp,$cod_cop,$cod_senal);
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
        $query->bind_param("iiiis",$cod_org,$cod_esp,$cod_cop,$cod_senal,$cod_usuario);
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
        $query->bind_param("iiii",$cod_org,$cod_esp,$cod_cop,$cod_senal);
        $query->execute();
        $query->bind_result($cantidad);
        $query->fetch();
        $result=$cantidad;
        $query->close();
        return $result;
    }

    function buscarEtiqueta($cod_org,$cod_esp,$cod_cop,$cod_etiqueta){
        include("./../conexion.php");
        $sql="SELECT desc_etiqueta
                FROM t_etiquetas
                WHERE cod_org=? AND cod_esp=? AND cod_cop=? AND cod_etiqueta=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("iiii",$cod_org,$cod_esp,$cod_cop,$cod_etiqueta);
        $query->execute();
        $query->bind_result($desc_etiqueta);
        $query->fetch();
        $result=$desc_etiqueta;
        $query->close();
        return $result;
    }
    
?>