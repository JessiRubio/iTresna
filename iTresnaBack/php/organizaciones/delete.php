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

    if(isset($cod_org) && $cod_org!="" && existeOrg($cod_org)){
        $sql="DELETE FROM t_org WHERE cod_org=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("i",$cod_org);
        $query->execute();
        $affected_rows=$query->affected_rows;
        $query->close();
        $result["error"]=($affected_rows==1)?0:1;
    }
    echo json_encode($result);

    function existeOrg($cod_org):bool{
        include("./../conexion.php");
        $sql="SELECT COUNT(*)
            FROM t_org
            WHERE cod_org=?";
        $query=$conexion->prepare($sql);
        $query->prepare($sql);
        $query->bind_param("i",$cod_org);
        $query->execute();
        $query->bind_result($count);
        $query->fetch();
        $query->close();
        return ($count==1);    
    }

?>