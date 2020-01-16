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

    if(isset($cod_org) && $cod_org!=""){
        
    }

?>