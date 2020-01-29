<?php

    require_once("./../conexion.php");
    $json = file_get_contents('php://input');
        $data = json_decode($json);
        
        $result=array(
            "error"=>1,
            "usuario"=>array()
        );


        $accion = $data->accion;

        if($accion!="" && $accion=="nuevo_usuario"){

            $sarbidea=$data->sarbidea;
            $tip_usuario=$data->tip_usuario;
            $cod_org=$data->cod_org;
            $nombre = $data->nombre;
            $ape1=$data->ape1;
            $ape2=$data->ape2;
            $campo_clasificador1=$data->campo_clasificador1;
            $campo_clasificador2=$data->campo_clasificador2;
            $campo_clasificador3=$data->campo_clasificador3;
            $cod_usuario=$data->cod_usuario;


            if(isset($cod_usuario) && $cod_usuario!=""){
                
                include("./../conexion.php");
                $sql="INSERT INTO t_usuarios(cod_usuario,tip_usuario,cod_org,sarbidea,nombre,ape1,ape2,campo_clasificador1,campo_clasificador2,campo_clasificador3)
                    VALUES(?,?,?,?,?,?,?,?,?,?)";
                $query=$conexion->prepare($sql);
                $query->bind_param("siisssssss",$cod_usuario,$tip_usuario,$cod_org,$sarbidea,$nombre,$ape1,$ape2,$campo_clasificador1,$campo_clasificador2,$campo_clasificador3);
                $query->execute();
                $query->close();
                return;
        
            }




        }else{

            $password=$data->password;
            $usuario=$data->usuario;

            if(isset($usuario) && $usuario!="" && isset($password) && $password!=""){
                $sql="SELECT *
                    FROM t_usuarios
                    WHERE cod_usuario=? and sarbidea=?";
                $query=$conexion->prepare($sql);
                $query->bind_param("ss",$usuario,$password);
                $query->execute();
                $query->bind_result($cod_usuario,$tip_usuario,$cod_org,$sarbidea,$nombre,$ape1,$ape2,$campo_clasificador1,$campo_clasificador2,$campo_clasificador3);
                $query->fetch();
                if($cod_usuario!=null){
                    $result["usuario"]=array(
                        "cod_usuario"=>$cod_usuario,
                        "tip_usuario"=>$tip_usuario,
                        "cod_org"=>$cod_org,
                        "sarbidea"=>$sarbidea,
                        "nombre"=>$nombre,
                        "ape1"=>$ape1,
                        "ape2"=>$ape2,
                        "campo_clasificador1"=>$campo_clasificador1,
                        "campo_clasificador2"=>$campo_clasificador2,
                        "campo_clasificador3"=>$campo_clasificador3,
                        "permisos"=>obtenerPermisos($cod_usuario)
                    );  
                    $result["error"] = 0;
                }
            }

    }

    echo json_encode($result);
    
    function obtenerPermisos($cod_usuario){
        include("./../conexion.php");
        $result=array();
            if(isset($cod_usuario) && $cod_usuario!=""){
                $sql="SELECT cod_org,cod_esp,cod_cop,ind_admin
                    FROM t_permisos
                    WHERE cod_usuario=?
                    ORDER BY cod_org,cod_esp,cod_cop";
                $query=$conexion->prepare($sql);
                $query->bind_param("s",$cod_usuario);
                $query->execute();
                $query->bind_result($cod_org,$cod_esp,$cod_cop,$ind_admin);
                while($query->fetch()){
                    
                    $result[]=array(
                        "cod_org"=>$cod_org,
                        "cod_esp"=>$cod_esp,
                        "cod_cop"=>$cod_cop,
                        "ind_admin"=>$ind_admin==1
                    );    
                }                 
            }
        return $result;
    }
?>