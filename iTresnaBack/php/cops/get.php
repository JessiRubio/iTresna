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
    $result["cops"]=array();
    if(isset($cod_org) && $cod_org!="" && isset($cod_esp) && $cod_esp!=""){
        $sql="SELECT DISTINCT cop.cod_cop, cop.desc_cop, cop.img_cop,cop.ind_cop_graficos, COUNT(sen.cod_senal)
                FROM t_cops cop
                LEFT JOIN t_senales sen
                ON cop.cod_org=sen.cod_org 
                AND cop.cod_esp=sen.cod_esp 
                AND cop.cod_cop=sen.cod_cop
                WHERE cop.cod_org=? AND cop.cod_esp=?
                GROUP BY cop.cod_cop, cop.cod_esp, cop.cod_org
                ORDER BY cop.cod_cop";
        $query=$conexion->prepare($sql);
        $query->bind_param("dd",$cod_org,$cod_esp);
        $query->execute();
        $query->bind_result($cod_cop,$desc_cop,$img_cop,$ind_cop_graficos,$cantidad_senales);
        while($query->fetch()){
            $result["cops"][]=array(
                "cod_org"=>$cod_org,
                "cod_esp"=>$cod_esp,
                "cod_cop"=>$cod_cop,
                "desc_cop"=>$desc_cop,
                "img_cop"=>$img_cop,
                "ind_cop_graficos"=>$ind_cop_graficos,
                "cantidad_senales"=>$cantidad_senales
            );
        }
        $result["error"]=0;
    }
    echo json_encode($result);
?>