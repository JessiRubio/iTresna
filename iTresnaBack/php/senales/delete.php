<?php

    include("./../conexion.php");
    $callback = false;
	if(isset($_GET['callback'])){
		$callback = $_GET['callback'];
    }
	foreach(array_keys($_GET) as $key){
		$$key = $_GET[$key];
    }
    $result = array(
        "error"=>1
    );
    if(isset($cod_org) && $cod_org !=="" && isset($cod_esp) && $cod_esp!=="" && isset($cod_cop) 
        && $cod_cop!=="" && isset($cod_senal) && $cod_senal!=="" ){
            $sql="DELETE FROM t_senales 
                WHERE cod_org=? AND cod_esp=? AND cod_cop=? AND cod_senal=?";
            $query=$conexion->prepare($sql);
            $query->bind_param("iiii",$cod_org,$cod_esp,$cod_cop,$cod_senal);
            $query->execute();
            $result["error"]= (($query->affected_rows)==1)? 0:1;
    }
    echo json_encode($result);
?>