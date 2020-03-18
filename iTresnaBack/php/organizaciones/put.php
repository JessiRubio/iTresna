<?php
    
    include("./../conexion.php");
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $contacto="";
    $desc_org=$data->desc_org;
    $imagen=$data->imagen;
    $eslogan=$data->eslogan;
    $enlace=$data->enlace;
    $cod_org=$data->cod_org;
    $contacto=$data->contacto;
    $result=array(
        "error"=>1,
    );
    if(existeOrg($cod_org)){
        if($contacto!=null){
            if(existeUsuario($contacto)){
                $cod_usuario=getAdministradorActual($cod_org);
                if(cambiarUsuario($cod_usuario,$contacto)){
                    if(!actualizarOrganizacion($cod_org,$desc_org,$eslogan,$enlace)){
                        $result["error"]=1;
                    }else{
                        $result["error"]=0;
                        if($imagen!=""){
                            actualizarImagen($cod_org,$imagen);
                        }
                    }
                }
            }
        }
        else{
            if(!actualizarOrganizacion($cod_org,$desc_org,$eslogan,$enlace)){
                $result["error"]=1;
            }else{
                $result["error"]=0;
                if($imagen!=""){
                    actualizarImagen($cod_org,$imagen);
                }
            }
        }
    }
    echo json_encode($result);

    function actualizarImagen($cod_org,$image){
        include("./../conexion.php");
        try{
            $file=base64_decode($image);
            $result["error"]=1;
            if(!file_exists('../media/'.$cod_org)){
                mkdir("../media/".$cod_org);
            }
            
            if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
                $image = substr($image, strpos($image, ',') + 1);
                $type = strtolower($type[1]); // jpg, png, gif
            
                if (!in_array($type, [ 'jpg', 'jpeg', 'gif', 'png' ])) {
                    throw new \Exception('invalid image type');
                }
            
                $image_decoded = base64_decode($image);
            
                if ($image_decoded === false) {
                    throw new \Exception('base64_decode failed');
                }
            } else {
                throw new \Exception('did not match data URI with image data');
            }
            

            file_put_contents("../media/".$cod_org."/logo_".$cod_org.".{$type}",$image_decoded);
            if(file_exists("../media/".$cod_org."/logo_".$cod_org.".{$type}")){
                $pathToFile="http://localhost:8080/media/".$cod_org."/logo_".$cod_org.".{$type}";
                $sql="UPDATE t_org
                    SET img_org=?
                    WHERE cod_org=?";
                $query=$conexion->prepare($sql);
                $query->bind_param("si",$pathToFile,$cod_org);
                $query->execute();
                $result["error"]=0;
            }else{
                $result["error"]="No se ha podido crear el archivo";
            }
        }catch(Exception $e){
            $result["error"]=$e->getMessage();
        }
    }
    function actualizarOrganizacion($cod_org,$desc_org,$eslogan,$enlace){
        include("./../conexion.php");
        $sql="UPDATE t_org
            SET desc_org=?,enlace_org=?,eslogan_org=?
            WHERE cod_org=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("sssi",$desc_org,$enlace,$eslogan,$cod_org);
        $query->execute();
        if(($query->affected_rows)==-1){
            return false;
        }
        $query->close();
        return true;
    }
    function cambiarUsuario($admin_actual,$admin_nuevo){
        include("./../conexion.php");
        $tip=3;
        $sql="UPDATE t_usuarios
            SET tip_usuario=?
            WHERE cod_usuario=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("is",$tip,$admin_actual);
        $query->execute();
        $tip=2;
        if(($query->affected_rows)==-1){
            return false;
        }
        $query->bind_param("is",$tip,$admin_nuevo);
        $query->execute();
        if(($query->affected_rows)==-1){
            return false;
        }
        $query->close();
        return true;
    }

    function existeUsuario($contacto){
        include("./../conexion.php");
        $sql="SELECT cod_usuario
            FROM t_usuarios
            WHERE cod_usuario=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("s",$contacto);
        $query->execute();
        $query->bind_result($cod_usuario);
        $query->fetch();
        $query->close();
        return ($cod_usuario!=null);
    }
    function getAdministradorActual($cod_org){
        include("./../conexion.php");
        $sql="SELECT cod_usuario
            FROM t_usuarios
            WHERE cod_org=? AND tip_usuario=2";
        $query=$conexion->prepare($sql);
        $query->bind_param("i",$cod_org);
        $query->execute();
        $query->bind_result($cod_usuario);
        $query->fetch();
        $query->close();
        return $cod_usuario;
    }
    function existeOrg($cod_org){
        include("./../conexion.php");
        $sql="SELECT COUNT(*)
            FROM t_org
            WHERE cod_org=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("i",$cod_org);
        $query->execute();
        $query->bind_result($count);
        $query->fetch();
        $query->close();
        return ($count>0);
    }
?>