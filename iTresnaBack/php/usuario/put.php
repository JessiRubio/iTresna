<?php
    include("./../conexion.php");
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $result=array();
    $result["error"]=1;
    
    $accion = $data->accion;
    $cod_usuario=$data->cod_usuario;

    if($accion!=""){
        if($accion=="modificar_permisos"){

            $cod_org=$data->cod_org;
            $ind_admin=$data->ind_admin;
            $sql="UPDATE t_permisos
                SET ind_admin=?
                WHERE cod_usuario=? AND cod_org=?";
            $query=$conexion->prepare($sql);
            $query->bind_param("isi",$ind_admin,$cod_usuario,$cod_org);
            $query->execute();
            $result["error"]=0;
    
    
    
        }else if($accion=="modificar_usuario"){
    
            if($cod_usuario!=""){
    
                $nombre = $data->nombre;
                $ape1=$data->ape1;
                $ape2=$data->ape2;
    
                $sql="UPDATE t_usuarios
                    SET nombre=?, ape1=?,ape2=?
                    WHERE cod_usuario=?";
                $query=$conexion->prepare($sql);
                $query->bind_param("ssss",$nombre,$ape1,$ape2,$cod_usuario);
                $query->execute();
                $result["error"]=0;
    
                }
    
        }else if($accion=="modificar_contrasena"){
    
            if($cod_usuario!=""){
    
                
                $cod_org=$data->cod_org;
                $sarbidea=$data->sarbidea;
            
                $sql="UPDATE t_usuarios
                    SET sarbidea=?
                    WHERE cod_usuario=? AND cod_org=?";
                $query=$conexion->prepare($sql);
                $query->bind_param("ssi",$sarbidea,$cod_usuario,$cod_org);
                $query->execute();
                $result["error"]=0;
    
                }
    
        }else if($accion=="modificar_perfil"){
    
            if($cod_usuario!=""){
    
    
                $nombre = $data->nombre;
                $ape1=$data->ape1;
                $ape2=$data->ape2;
                $cod_org=$data->cod_org;
                $cod_usuarioAnterior=$data->cod_usuarioAnterior;
    
                $sql="UPDATE t_usuarios
                    SET nombre=?, ape1=?,ape2=?, cod_usuario=?
                    WHERE cod_usuario=? AND cod_org=?";
                $query=$conexion->prepare($sql);
                $query->bind_param("sssssi",$nombre,$ape1,$ape2,$cod_usuario, $cod_usuarioAnterior,$cod_org);
                $query->execute();
                $result["error"]=0;
    
                }
    
        }else if ($accion=="modificar_clasificacion"){
            
            $cod_org=$data->cod_org;
            $clasificacion=$data->clasificacion;
            $categoria=$data->categoria;
            $categoriaAnterior=getCategoriaAnterior($cod_org,$clasificacion,$cod_usuario);
            if($categoriaAnterior!="" || $categoriaAnterior!=null){   
                            
                $sql="UPDATE t_clasificacion_usuarios
                SET categoria=?
                WHERE cod_org=? AND tip_clasificacion=? AND categoria=? AND cod_usuario=?";
                $query=$conexion->prepare($sql);
                $query->bind_param("sisss",$categoria,$cod_org,$clasificacion,$categoriaAnterior,$cod_usuario);
                $query->execute();
                $affected_rows=$query->affected_rows;
                $result["error"]=($affected_rows<= 1&& $affected_rows>=0)?0:1;
            }else{
                $sql="INSERT t_clasificacion_usuarios
                (cod_org,tip_clasificacion,categoria,cod_usuario)
                VALUES(?,?,?,?)";
                $query=$conexion->prepare($sql);
                $query->bind_param("isss",$cod_org,$clasificacion,
                    $categoria,$cod_usuario);
                $query->execute();
                $affected_rows=$query->affected_rows;
                $result["error"]=($affected_rows<=1 && $affected_rows>=0)?0:1;
            }
            
        }
    }
    function getCategoriaAnterior($cod_org,$clasificacion,$cod_usuario){
        include("./../conexion.php");
        $sql="SELECT categoria
            FROM t_clasificacion_usuarios
            WHERE cod_org=? and tip_clasificacion=? and cod_usuario=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("iss",$cod_org,$clasificacion,$cod_usuario);
        $query->execute();
        $query->bind_result($categoria);
        $query->fetch();
        $query->close();
        return $categoria;
    }
    echo json_encode($result);
?>