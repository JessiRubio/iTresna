<?php
    require_once("./../conexion.php");
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    $nueva_senal = $data->nueva_senal;
    $cod_usuario=$data->cod_usuario;
    $cod_org=$data->cod_org;
    $cod_esp=$data->cod_esp;
    $cod_cop=$data->cod_cop;

    $result=array(
        "error"=>1,
        "aniadido"=>0
    );
    if($nueva_senal){
        $desc_senal = $data->desc_senal;
        $enlace = $data->$enlace;
        $cod_etiqueta = $date->$cod_etiqueta;
        if($cod_usuario!=="" && $cod_org!=="" && $cod_esp!=="" && $cod_cop!=="" && $desc_senal!=="" && $enlace!=="" && $cod_etiqueta!==""){
            $sql = "INSERT INTO t_senales 
            VALUES cod_usuario = $cod_usuario 
                AND cod_org = $cod_ord
                AND cod_esp = $cod_esp
                AND cod_cop = $cod_cop
                AND desc_senal = $desc_senal
                AND enlace = $enlace
                AND cod_etiqueta = $cod_etiqueta
                AND cod_senal = (SELECT COUNT(*) FROM t_senales) + 1
                AND fecha_hora = getDate()
                AND ind_fich_gest = 0"
            ;
            $query=$conexion->prepare($sql);
            $query->execute();
            $affected_rows=$query->affected_rows;
            $result["error"]=($affected_rows==1)?0:1;
            $result["aniadido"]=1;
            $query->close();
        }


    } else {
        
        $cod_senal=$data->cod_senal;
        if($cod_usuario!=="" && $cod_org!=="" 
            && $cod_esp!=="" && $cod_cop!=="" && $cod_senal!==""){

            if(!haDadoLike($cod_usuario,$cod_org,$cod_esp,$cod_cop,$cod_senal)){
                $sql="INSERT INTO t_megusta VALUES(?,?,?,?,?)";
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
    }
    echo json_encode($result);
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