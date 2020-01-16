<?php
    require_once("./../conexion.php");
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $result=array();
    $result["error"]=1;
    
    $cod_esp = $data->cod_esp;
    $cod_org = $data->cod_org;
    $desc_cop = $data->desc_cop;
    $image = $data->image;
    if($desc_cop!="" && $cod_esp!="" && $cod_org!=""){
        if(existeOrganizacion($cod_org)){
            if(existeEspacio($cod_org,$cod_esp)){
                $cod_cop=obtenerUltimaCop($cod_org,$cod_esp);
                insertarCop($cod_org,$cod_esp,$cod_cop,$desc_cop);
                if($image!=""){
                    updateImagen($cod_org,$cod_esp,$cod_cop,$image);
                }else{
                    $result["error"]=0;
                }
            }else{
                $result["error"]="No se encuentra o no existe el espacio";
            }
        }else{
            $result["error"]="No se encuentra o no exister la organización";
        }
    }
    echo json_encode($result);

    function updateImagen($cod_org,$cod_esp,$cod_cop,$image){
        include("./../conexion.php");
        try{
            $file=base64_decode($image);
            $result["error"]=1;
            if(!file_exists('../media/'.$cod_org)){
                mkdir("../media/".$cod_org);
                mkdir("../media/".$cod_org."/".$cod_esp);
            }else if(!file_exists("../media/".$cod_org."/".$cod_esp)){
                mkdir("../media/".$cod_org."/".$cod_esp);
            }
            file_put_contents("../media/".$cod_org."/".$cod_esp."/logo_".$cod_cop.".png",$file);
            if(file_exists('../media/'.$cod_org."/".$cod_esp."/logo_".$cod_cop.".png")){
                $pathToFile="http://localhost:8080/media/".$cod_org."/".$cod_esp."/logo_".$cod_cop.".png";
                $sql="UPDATE t_cops
                    SET img_cop=?
                    WHERE cod_cop=? AND cod_esp=? AND cod_org=?";
                $query=$conexion->prepare($sql);
                $query->bind_param("ssiii",$desc_cop,$pathToFile,$cod_cop,$cod_esp,$cod_org);
                $query->execute();
                $result["error"]=0;
            }else{
                $result["error"]="No se ha podido crear el archivo";
            }
        }catch(Exception $e){
            $result["error"]=$e->getMessage();
        }
    }
    function obtenerUltimaCop($cod_org,$cod_esp){
        include("./../conexion.php");
        $sql="SELECT (MAX(cod_cop)+1)
            FROM t_cops
            WHERE cod_org=? AND cod_esp=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("ii",$cod_org,$cod_esp);
        $query->execute();
        $query->bind_result($cod_org);
        $query->fetch();
        return $cod_org;
    }
    function insertarCop($cod_org,$cod_esp,$cod_cop,$desc_cop){
        include("./../conexion.php");
        $sql="INSERT INTO t_cops(cod_cop,cod_esp,cod_org,desc_cop)
            VALUES(?,?,?,?)";
        $query=$conexion->prepare($sql);
        $query->bind_param("iiis",$cod_cop,$cod_esp,$cod_org,$desc_cop);
        $query->execute();
        $query->close();
        return;
    }
    function existeOrganizacion($cod_org){
        include("./../conexion.php");
        $sql="SELECT COUNT(*)
            FROM t_org
            WHERE cod_org=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("i",$cod_org);
        $query->execute();
        $query->bind_result($cantidad);
        $query->fetch();
        $query->close();
        return ($cantidad==1);
    }
    function existeEspacio($cod_org,$cod_esp){
        include("./../conexion.php");
        $sql="SELECT COUNT(*)
            FROM t_espacios
            WHERE cod_org=? AND cod_esp=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("ii",$cod_org,$cod_esp);
        $query->execute();
        $query->bind_result($cantidad);
        $query->fetch();
        $query->close();
        return ($cantidad==1);
    }
    

?>