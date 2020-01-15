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

    if(isset($cod_org) && isset($cod_esp)){
        if(existeEspacio($cod_org,$cod_esp)){
            
            $orden=getOrdenEspacio($cod_org,$cod_esp);
            $cods_esps=array();
            $cods_esps=getEspaciosAfectados($cod_org,$orden);
            foreach($cods_esps as $espacio){
                if(!updateOrden($cod_org,$espacio["cod_esp"],($espacio["orden"]))){
                    $result["error"]=1;
                    echo json_encode($result);
                    return;
                }
            }
            $sql="DELETE FROM t_espacios WHERE cod_org=? AND cod_esp=?";
            $query=$conexion->prepare($sql);
            $query->bind_param("ii",$cod_org,$cod_esp);
            $query->execute();
            $affected_rows=$query->affected_rows;
            $result["error"]=($affected_rows>0)?0:1;
        }
    }
    echo json_encode($result);
    function getOrdenEspacio($cod_org,$cod_esp):int{
        include("./../conexion.php");
        $orden=0;
        $sql="SELECT orden
            FROM t_espacios
            WHERE cod_org=? AND cod_esp=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("ii",$cod_org,$cod_esp);
        $query->execute();
        $query->bind_result($orden);
        $query->fetch();
        $query->close();
        return $orden;
    }
    function existeEspacio($cod_org,$cod_esp):bool{
        include("./../conexion.php");
        $count=0;
        $sql="SELECT count(*)
            FROM t_espacios
            WHERE cod_org=? AND cod_esp=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("ii",$cod_org,$cod_esp);
        $query->execute();
        $query->bind_result($count);
        $query->fetch();
        $query->close();
        return ($count>0);
    }
    function getEspaciosAfectados($cod_org,$orden):Array{
        include("./../conexion.php");
        $result=array();
        $sql="SELECT cod_esp,(orden-1)
        FROM t_espacios
        WHERE cod_org=? AND orden>=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("ii",$cod_org,$orden);
        $query->execute();
        $query->bind_result($cod_esp,$orden);
        while($query->fetch()){
            $result[]=array(
                "cod_esp"=>$cod_esp,
                "orden"=>$orden
            );
        }
        return $result;
    }
    function updateOrden($cod_org,$cod_esp,$orden):bool{
        include("./../conexion.php");
        $sql="UPDATE t_espacios
            SET orden=?
            WHERE cod_org=? AND cod_esp=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("iii",$orden,$cod_org,$cod_esp);
        $query->execute();
        $affected_rows=$query->affected_rows;
        $query->close();
        return $affected_rows>0;
    }
?>