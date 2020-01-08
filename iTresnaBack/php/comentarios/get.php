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
    if(isset($cod_senal) && $cod_senal!=""){
        $sql="SELECT cod_comentario, cod_senal, cod_cop, cod_esp, cod_org, cod_usuario, comentario
            FROM t_comentarios
            WHERE cod_senal=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("i",$cod_senal);
        $query->execute();
        $query->bind_result($cod_comentario, $cod_senal, $cod_cop, $cod_esp, $cod_org, $cod_usuario, $comentario);
        while($query->fetch()){
            $result["comentarios"][]=array(
                "cod_comentario"=>$cod_comentario,
                "cod_senal"=>$cod_senal,
                "cod_cop"=>$cod_cop,
                "cod_esp"=>$cod_esp,
                "cod_org"=>$cod_org,
                "cod_usuario"=>$cod_usuario,
                "comentario"=>$comentario
                
            );
        $result["error"]=0;

    }







    
?>