<?php
    include("./../conexion.php");
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    $accion = $data->accion;
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
        if($cod_usuario!="" && $cod_org!="" && $cod_esp!="" && $cod_cop!=""){
            $cod_comentario=obtenerUltimoComentario($cod_org,$cod_esp,$cod_cop,$cod_senal);
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

    function obtenerUltimoComentario($cod_org,$cod_esp,$cod_cop,$cod_senal):int{
        include("./../conexion.php");
        $sql="SELECT (COUNT(cod_comentario)+1)
            FROM t_comentarios
            WHERE cod_org=? AND cod_esp=? AND cod_cop=? AND cod_senal=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("iiii",$cod_org,$cod_esp,$cod_cop,$cod_senal);
        $query->execute();
        $query->bind_result($cod_comentario);
        $query->fetch();
        $query->close();
        return $cod_comentario;
    }
    















    
?>