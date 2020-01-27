<?php
    require_once("./../conexion.php");
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $result=array();
    $result["error"]=1;
    
    $nombre = $data->nombre;
    $ape1=$data->ape1;
    $ape2=$data->ape2;
    $campo_clasificador1=$data->campo_clasificador1;
    $campo_clasificador2=$data->campo_clasificador2;
    $campo_clasificador3=$data->campo_clasificador3;
    $cod_usuario=$data->cod_usuario;


    if($cod_usuario!=""){

        $sql="UPDATE t_usuarios
                        SET nombre=?, ape1=?,ape2=?,campo_clasificador1=?, campo_clasificador2=?, campo_clasificador3=?
                        WHERE cod_usuario=?";
                    $query=$conexion->prepare($sql);
                    $query->bind_param("sssssss",$nombre,$ape1,$ape2,$campo_clasificador1, $campo_clasificador2,$campo_clasificador3,$cod_usuario);
                    $query->execute();
                    $result["error"]=0;

    }


?>