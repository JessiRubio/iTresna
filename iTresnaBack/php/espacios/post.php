<?php
    require_once("./../conexion.php");
    
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    $cod_org=$data->cod_org;
    $desc_esp=$data->desc_esp;
    $ind_esp_curacion=$data->ind_esp_curacion;
    $orden=$data->orden;
    $result=array();
    $result["error"]=1;
    if(isset($cod_org) && isset($orden) && isset($desc_esp)
         && $desc_esp!="" && isset($ind_esp_curacion)){
        $cantidad=getNuevaCodEspacio($cod_org);
        if($cantidad==0){
            $cod_esp=1;
        }else{
            $cod_esp=$cantidad+1;
        }
        $sql="INSERT INTO t_espacios(cod_org,cod_esp,desc_esp,ind_esp_curacion)
            VALUES(?,?,?,?)";
        $query=$conexion->prepare($sql);
        $query->bind_param("iisi",$cod_org,$cod_esp,$desc_esp,$ind_esp_curacion);
        $query->execute();
        if($orden<=0||$orden>$cantidad){
            $orden=$cantidad+1;
            $result["error"]=(updateOrden($cod_org,$cod_esp,$orden))?0:1;
        }else{
            //verificar si en el orden dado por el usuario existe algun espacio
            //de ser asi sumar 1 a todos los ordenes empezando por el cod_esp dado y luego introducir
            //el orden en el espacio
            if(!hayEspacioEnOrden($orden,$cod_org)){
                $result["error"]=(updateOrden($cod_org,$cod_esp,$orden))?0:1;                    
            }else{
                $cods_esps=array();
                $cods_esps=getEspaciosAfectados($cod_org,$orden);
                foreach($cods_esps as $espacio){
                    if(!updateOrden($cod_org,$espacio["cod_esp"],($espacio["orden"]+1))){
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

    function getEspaciosAfectados($cod_org,$orden):Array{
        include("./../conexion.php");
        $result=array();
        $sql="SELECT cod_esp,orden
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

    function getNuevaCodEspacio($cod_org):int{
        include("./../conexion.php");
        $sql="SELECT MAX(cod_esp)
                FROM t_espacios
                WHERE cod_org=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("i",$cod_org);
        $query->execute();
        $query->bind_result($cod_esp);
        $query->fetch();
        $query->close();
        return ($cod_esp!=null)?$cod_esp+1:1;
    }
?>