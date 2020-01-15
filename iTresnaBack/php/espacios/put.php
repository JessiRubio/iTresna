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
        //Actualizo los datos del espacio
        $sql="UPDATE t_espacios
        SET desc_esp=?,ind_esp_curacion=?
        WHERE cod_org=? AND cod_esp=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("siii",$desc_esp,$ind_esp_curacion,$cod_org,$cod_esp);
        $query->execute();
        $result["error"]=(($query->affected_rows)>0)?0:1;
        $query->close();
        $cantidad=cantidadEspaciosOrg($cod_org);
        //Obtengo el orden en el que se econtraba el espacio
        if($orden<=0||$orden>$cantidad){
            $result["error"]=0;
        }else if(!mismoOrden($cod_org,$cod_esp,$orden)){
            //verificar si en el orden dado por el usuario existe algun espacio
            //de ser asi sumar 1 a todos los ordenes empezando por el cod_esp dado y luego introducir
            //el orden en el espacio
            if(!hayEspacioEnOrden($orden,$cod_org)){
                $result["error"]=(updateOrden($cod_org,$cod_esp,$orden))?0:1;                    
            }else{
                $orden_actual=getOrdenActual($cod_org,$cod_esp);
                $cods_esps=array();
                $cods_esps=getEspaciosAfectados($cod_org,$orden,$orden_actual);
                foreach($cods_esps as $espacio){
                    if(!updateOrden($cod_org,$espacio["cod_esp"],($espacio["orden"]))){
                        $result["error"]=1;
                        echo json_encode($result);
                        return;
                    }
                }
                $result["error"]=(updateOrden($cod_org,$cod_esp,$orden))?0:1;
            }
        }
    }
    echo json_encode($result);

    function getEspaciosAfectados($cod_org,$orden,$orden_actual):Array{
        include("./../conexion.php");
        $result=array();
        if($orden>$orden_actual){
            $sql="SELECT cod_esp,(orden-1)
            FROM t_espacios
            WHERE cod_org=? AND orden<=? AND orden>=?";
        }else{
            $sql="SELECT cod_esp,(orden+1)
            FROM t_espacios
            WHERE cod_org=? AND orden>=? AND orden<=?";
        }
        $query=$conexion->prepare($sql);
        $query->bind_param("iii",$cod_org,$orden,$orden_actual);
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

    function hayEspacioEnOrden($orden,$cod_org):bool{
        include("./../conexion.php");
        $cantidad=0;
        $sql="SELECT COUNT(*)
            FROM t_espacios
            WHERE cod_org=? AND orden=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("ii",$cod_org,$orden);
        $query->execute();
        $query->bind_result($cantidad);
        $query->fetch();
        $result=$cantidad;
        $query->close();
        return ($result>0);
    }

    function cantidadEspaciosOrg($cod_org):int{
        include("./../conexion.php");
        $cuantos=0;
        $sql="SELECT COUNT(*)
                FROM t_espacios
                WHERE cod_org=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("i",$cod_org);
        $query->execute();
        $query->bind_result($cuantos);
        $query->fetch();
        $result=$cuantos;
        $query->close();
        return $result;
    }

    function mismoOrden($cod_org,$cod_esp,$orden){
        include("./../conexion.php");
        $result=array();
        $sql="SELECT orden
            FROM t_espacios
            WHERE cod_org=? AND cod_esp=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("ii",$cod_org,$cod_esp);
        $query->execute();
        $query->bind_result($orden_bd);
        $query->fetch();
        $query->close();
        return ($orden==$orden_bd);
    }
    function getOrdenActual($cod_org,$cod_esp){
        include("./../conexion.php");
        $result=array();
        $sql="SELECT orden
            FROM t_espacios
            WHERE cod_org=? AND cod_esp=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("ii",$cod_org,$cod_esp);
        $query->execute();
        $query->bind_result($orden_bd);
        $query->fetch();
        $query->close();
        return $orden_bd;
    }
?>