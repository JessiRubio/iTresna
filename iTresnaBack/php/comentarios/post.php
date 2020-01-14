<?php
    include("./../conexion.php");
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    $accion = $data->accion;
    $cod_comentario=$data->cod_comentario;
    $cod_senal=$data->cod_senal;
    $cod_cop=$data->cod_cop;
    $cod_esp=$data->cod_esp;
    $cod_org=$data->cod_org;
    $cod_usuario=$data->cod_usuario;
    $comentario=$data->comentario;

    $result=array(
        "error"=>1,
        "aniadido"=>0
    );

    if($accion==="nuevo_comentario"){

        if($cod_usuario!="" && $cod_org!="" && $cod_esp!="" && $cod_cop!="" && $comentario!="" 
            && $cod_comentario!=""){

            $sql = "INSERT INTO t_comentarios(cod_comentario,cod_senal,cod_cop,cod_esp,cod_org,
                cod_usuario,comentario) VALUES(?,?,?,?,?,?,?)";
            $query=$conexion->prepare($sql);
            $query->bind_param("iiiiiss",$cod_comentario,$cod_senal,$cod_cop,$cod_esp,$cod_org,
                $cod_usuario,$comentario);
            $query->execute();
            $result["error"]=(($query->affected_rows)>0)?0:1;
            $result["aniadido"]=$query->affected_rows;
            $query->close();

        }
    }

    echo json_encode($result);
    















    
?>