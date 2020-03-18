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

    if(isset($cod_etiqueta) && $cod_etiqueta!="" && isset($cod_cop) && $cod_cop!=""
        && isset($cod_org) && $cod_org!="" && isset($cod_esp) && $cod_esp!=""){
        $sql="DELETE FROM t_etiquetas
            WHERE cod_etiqueta=? AND cod_org=? AND cod_esp=? AND cod_cop=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("iiii",$cod_etiqueta,$cod_org,$cod_esp,$cod_cop);
        $query->execute();
        $affected_rows=$query->affected_rows;
        $result["error"]=($affected_rows>0)?0:1;
        $query->close();
    }else{
        if(isset($cod_cop) && $cod_cop!="" && isset($cod_org) && $cod_org!=""
            && isset($cod_esp) && $cod_esp!=""){
        
            if(existeCop($cod_org,$cod_esp,$cod_cop)){
                $sql="DELETE FROM t_cops
                    WHERE cod_org=? AND cod_esp=? AND cod_cop=?";
                $query=$conexion->prepare($sql);
                $query->bind_param("iii",$cod_org,$cod_esp,$cod_cop);
                $query->execute();
                $affected_rows=$query->affected_rows;
                $query->close();
                $result["error"]=($affected_rows>0)?0:1;
            }
        }
    
    }
    echo json_encode($result);

    function existeCop($cod_org,$cod_esp,$cod_cop){
        include("./../conexion.php");
        $sql="SELECT COUNT(*)
            FROM t_cops
            WHERE cod_org=? AND cod_esp=? AND cod_cop=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("iii",$cod_org,$cod_esp,$cod_cop);
        $query->execute();
        $query->bind_result($cantidad);
        $query->fetch();
        $query->close();
        return ($cantidad==1);
    }
?>