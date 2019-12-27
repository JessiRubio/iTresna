<?php
    require_once("./../conexion.php");
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    
    $cod_org=$data->cod_org;
    $cod_esp=$data->cod_esp;
    $cod_cop=$data->cod_cop;
    $cod_senal=$data->cod_senal;
    $cod_etiqueta=$data->cod_etiqueta;
    $desc_senal=$data->desc_senal;
    $enlace=$data->enlace;
    $result["error"]=1;
    if($cod_org!="" && $cod_esp!="" && $cod_cop!="" && $cod_senal!="" 
        && $cod_etiqueta!="" && $desc_senal!="" && $enlace!=""){
        $sql="UPDATE t_senales
                SET cod_etiqueta=?,desc_senal=?,enlace=?
                WHERE cod_org=? AND cod_esp=? AND cod_cop=? AND cod_senal=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("issiiii",$cod_etiqueta,$desc_senal,$enlace,$cod_org,
                $cod_esp,$cod_cop,$cod_senal);
        $query->execute();
        $result["error"]=(($query->affected_rows)>0)?0:1;
    }
    echo json_encode($result);
?>