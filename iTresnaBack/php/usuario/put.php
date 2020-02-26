<?php
    require_once("./../conexion.php");
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $result=array();
    $result["error"]=1;
    
    $accion = $data->accion;
    $cod_usuario=$data->cod_usuario;



    if($accion!="" && $accion=="modificar_permisos"){

        $cod_org=$data->cod_org;
        $ind_admin=$data->ind_admin;
        $sql="UPDATE t_permisos
                                SET ind_admin=?
                                WHERE cod_usuario=? AND cod_org=?";
                            $query=$conexion->prepare($sql);
                            $query->bind_param("isi",$ind_admin,$cod_usuario,$cod_org);
                            $query->execute();
                            $result["error"]=0;



    }else if($accion!="" && $accion=="modificar_usuario"){

        if($cod_usuario!=""){


                $nombre = $data->nombre;
                $ape1=$data->ape1;
                $ape2=$data->ape2;
                $campo_clasificador1=$data->campo_clasificador1;
                $campo_clasificador2=$data->campo_clasificador2;
                $campo_clasificador3=$data->campo_clasificador3;



                $sql="UPDATE t_usuarios
                                SET nombre=?, ape1=?,ape2=?,campo_clasificador1=?, campo_clasificador2=?, campo_clasificador3=?
                                WHERE cod_usuario=?";
                            $query=$conexion->prepare($sql);
                            $query->bind_param("sssssss",$nombre,$ape1,$ape2,$campo_clasificador1, $campo_clasificador2,$campo_clasificador3,$cod_usuario);
                            $query->execute();
                            $result["error"]=0;

            }

    }else if($accion!="" && $accion=="modificar_contrasena"){

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

    }



    


?>