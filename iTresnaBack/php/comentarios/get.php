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
        $sql="SELECT com.cod_comentario, com.cod_senal, com.cod_cop, com.cod_esp, com.cod_org,
                com.cod_usuario, com.comentario, usu.nombre,usu.ape1,usu.ape2
                FROM t_comentarios com
                JOIN t_usuarios usu
                ON usu.cod_usuario=com.cod_usuario
                WHERE com.cod_senal=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("i",$cod_senal);
        $query->execute();
        $query->bind_result($cod_comentario, $cod_senal, $cod_cop, $cod_esp, $cod_org, $cod_usuario, $comentario,$nombre,$ape1,$ape2);
        while($query->fetch()){
            $result["comentarios"][]=array(
                "cod_comentario"=>$cod_comentario,
                "cod_senal"=>$cod_senal,
                "cod_cop"=>$cod_cop,
                "cod_esp"=>$cod_esp,
                "cod_org"=>$cod_org,
                "cod_usuario"=>$cod_usuario,
                "comentario"=>$comentario,
                "nombre_completo" => $nombre." ".$ape1." ".$ape2
                
            );
        
            $result["error"]=0;
    
        }

    
    echo json_encode($result);
?>