<?php
    require_once("./../conexion.php");
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    
    $cod_org=$data->cod_org;
    $cod_esp=$data->cod_esp;
    $desc_esp=$data->desc_esp;
    $ind_esp_curacion=$data->ind_esp_curacion;
    $orden=$data=>$orden;
    $result["error"]=1;
    if($cod_org!="" && $cod_esp!="" && ($desc_esp!="" || $ind_esp_curacion!="")&& $orden!=""){
        $sql="UPDATE t_espacios
                SET desc_esp=?,ind_esp_curacion=?,orden=?
                WHERE cod_org=? AND cod_esp=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("siiii",$desc_esp,$ind_esp_curacion,$orden,$cod_org,$cod_esp);
        $query->execute();
        $result["error"]=(($query->affected_rows)>0)?0:1;
    }
    echo json_encode($result);
?>