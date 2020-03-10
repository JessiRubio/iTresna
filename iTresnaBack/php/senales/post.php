<?php
    include("./../conexion.php");
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    $accion = $data->accion;
    $cod_usuario=$data->cod_usuario;
    $cod_org=$data->cod_org;
    $cod_esp=$data->cod_esp;
    $cod_cop=$data->cod_cop;

    $result=array(
        "error"=>1,
        "aniadido"=>0
    );
    if($accion==="nueva_senal"){
        
        $desc_senal = $data->desc_senal;
        $enlace = $data->enlace;
        $cod_etiqueta = $data->cod_etiqueta;
        $img_senal = $data->img_senal;
        $titulo = $data->titulo;

        if($cod_usuario!="" && $cod_org!="" && $cod_esp!="" && $cod_cop!="" 
            && $desc_senal!="" && $enlace!="" && $cod_etiqueta!="" && $titulo!="")
        {
            
            $sql = "INSERT INTO t_senales(cod_senal,cod_cop,cod_esp,cod_org,cod_etiqueta,
                cod_usuario,desc_senal,enlace,img_senal,titulo) VALUES(?,?,?,?,?,?,?,?,?,?)";
            $query=$conexion->prepare($sql);
            $cod_senal=obtCodSenal($cod_cop, $cod_esp, $cod_org);
            
            $query->bind_param("iiiiisssss",$cod_senal, $cod_cop, $cod_esp, $cod_org,
            $cod_etiqueta, $cod_usuario, $desc_senal,$enlace, $img_senal, $titulo);
            $query->execute();
            $result["error"]=(($query->affected_rows)>0)?0:1;
            $result["aniadido"]=$query->affected_rows;
            $query->close();
        }

    } else if($accion==="like"){
        $cod_senal=$data->cod_senal;
        if($cod_usuario!=="" && $cod_org!=="" 
            && $cod_esp!=="" && $cod_cop!=="" && $cod_senal!==""){

            if(!haDadoLike($cod_usuario,$cod_org,$cod_esp,$cod_cop,$cod_senal)){
                $sql="INSERT INTO t_megusta(cod_senal,cod_cop,cod_esp,cod_org,cod_usuario) VALUES(?,?,?,?,?)";
                $query=$conexion->prepare($sql);
                $query->bind_param("iiiis",$cod_senal,$cod_cop,$cod_esp,$cod_org,$cod_usuario);
                $query->execute();
                $affected_rows=$query->affected_rows;
                $result["error"]=($affected_rows==1)?0:1;
                $result["aniadido"]=1;
                $query->close();
            }else{
                $sql="DELETE FROM t_megusta WHERE cod_usuario=? AND cod_org=? AND cod_esp=?
                    AND cod_cop=? AND cod_senal=?";
                $query=$conexion->prepare($sql);
                $query->bind_param("siiii",$cod_usuario,$cod_org,$cod_esp,$cod_cop,$cod_senal);
                $query->execute();
                $affected_rows=$query->affected_rows;
                $result["error"]=($affected_rows==1)?0:1;
                $result["aniadido"]=0;
                $query->close();
            }
        }
    }else{
        $result["metodo"]="Metodo no soportado";
    }
    echo json_encode($result);

    function obtCodSenal($cod_cop,$cod_esp,$cod_org):int{
        include("./../conexion.php");
        $sql = "SELECT MAX(cod_senal)
                FROM t_senales
                WHERE cod_org=? AND cod_esp=? AND cod_cop=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("iii",$cod_org,$cod_esp,$cod_cop);
        $query->execute();
        $query->bind_result($cod_senal);
        $query->fetch();
        $query->close();
        return ($cod_senal!=null)?$cod_senal+1:1;        
    }
    function haDadoLike($cod_usuario,$cod_org,$cod_esp,$cod_cop,$cod_senal):bool{  
        include("./../conexion.php");
        $sql="SELECT COUNT(*)
                FROM t_megusta
                WHERE cod_usuario=? AND cod_org=? AND cod_esp=?
                AND cod_cop=? AND cod_senal=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("siiii",$cod_usuario,$cod_org,$cod_esp,$cod_cop,$cod_senal);
        $query->execute();
        $query->bind_result($cuantos);
        $query->fetch();
        return $cuantos>0;
    }
?>