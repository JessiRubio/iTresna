<?php
    require_once("./../conexion.php");
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    
    $cod_org=$data->cod_org;
    $cod_esp=$data->cod_esp;
    
    $desc_esp=$data->desc_esp;
    $ind_esp_curacion=$data->ind_esp_curacion;
    $orden=$data->orden;
    $result["error"]=1;
    if($cod_org!="" && $cod_esp!="" && ($desc_esp!="" || $ind_esp_curacion!="")&& $orden!=""){
        //Obtengo el orden en el que se econtraba el espacio
        $sql="SELECT orden 
               FROM t_espacios
                WHERE cod_esp=? AND cod_org=?";

        $query=$conexion->prepare($sql);
        $query->bind_param("ii",$cod_esp,$cod_org);
        $query->execute();
        $query->bind_result($orden_actual);
        $query->fetch();
        $query->close();
        if($orden_actual!=null){
            $sql="SELECT cod_esp
            FROM t_espacios
            WHERE orden=?";
            $query=$conexion->prepare($sql);
            $query->bind_param("i",$orden);
            $query->execute();
            $query->bind_result($cod_esp_seleccion);
            $espacios=array();
            $query->fetch();
            $query->close();
            cambiarOrden($cod_org,$cod_esp_seleccion,$orden_actual);
        }
        $sql="UPDATE t_espacios
        SET desc_esp=?,ind_esp_curacion=?,orden=?
        WHERE cod_org=? AND cod_esp=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("siiii",$desc_esp,$ind_esp_curacion,$orden,$cod_org,$cod_esp);
        $query->execute();
        $result["error"]=(($query->affected_rows)>0)?0:1;
        $query->close();
        
    }
    echo json_encode($result);

    function cambiarOrden($cod_org,$cod_esp,$orden){

        include("./../conexion.php");

        $sql="UPDATE t_espacios
        SET orden=?
        WHERE cod_org=? AND cod_esp=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("iii",$orden,$cod_org,$cod_esp);
        $query->execute();
        $query->close();
        return;
    }
?>