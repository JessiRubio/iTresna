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
    if (isset($cod_usuario) && $cod_usuario!="" && isset($ind_admin) && $ind_admin!="" ){
        $sql="DELETE FROM t_permisos
            WHERE cod_usuario=? AND cod_org=? AND cod_cop=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("sii",$cod_usuario,$cod_org, $cod_cop);
        $query->execute();
        $affected_rows=$query->affected_rows;
        $query->close();
        $result["error"]=($affected_rows>0)?0:1;
    }
    else {
        $sql="DELETE FROM t_usuarios
            WHERE cod_usuario=? AND cod_org=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("si",$cod_usuario,$cod_org);
        $query->execute();
        $affected_rows=$query->affected_rows;
        $query->close();
        $result["error"]=($affected_rows>0)?0:1;
    } 

    echo json_encode($result);

    
?>