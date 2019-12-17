<?php
    require_once("./../conexion.php");
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $cod_usuario=$data->cod_usuario;
    $cod_org=$data->cod_org;
    $cod_esp=$data->cod_esp;
    $cod_cop=$data->cod_cop;
    $cod_senal=$data->cod_senal;
    $result=array(
        "error"=>1,
        "aniadido"=>0
    );
    if($cod_usuario!=="" && $cod_org!=="" 
        && $cod_esp!=="" && $cod_cop!=="" && $cod_senal!==""){
            

        if(!haDadoLike($cod_usuario,$cod_org,$cod_esp,$cod_cop,$cod_senal)){
            $sql="INSERT INTO t_megusta VALUES(?,?,?,?,?)";
            $query=$conexion->prepare($sql);
            $query->bind_param("sdddd",$cod_usuario,$cod_org,$cod_esp,$cod_cop,$cod_senal);
            $query->execute();
            $affected_rows=$query->affected_rows;
            $result["error"]=($affected_rows==1)?0:1;
            $result["aniadido"]=1;
            $query->close();
        }else{
            $sql="DELETE FROM t_megusta WHERE cod_usuario=? AND cod_org=? AND cod_esp=?
                 AND cod_cop=? AND cod_senal=?";
            $query=$conexion->prepare($sql);
            $query->bind_param("sdddd",$cod_usuario,$cod_org,$cod_esp,$cod_cop,$cod_senal);
            $query->execute();
            $affected_rows=$query->affected_rows;
            $result["error"]=($affected_rows==1)?0:1;
            $query->close();
        }
    }
    function haDadoLike($cod_usuario,$cod_org,$cod_esp,$cod_cop,$cod_senal):bool{
        include("./../conexion.php");
        $sql="SELECT COUNT(*)
                FROM t_megusta
                WHERE cod_usuario=? AND cod_org=? AND cod_esp=?
                AND cod_cop=? AND cod_senal=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("sdddd",$cod_usuario,$cod_org,$cod_esp,$cod_cop,$cod_senal);
        $query->execute();
        $query->bind_result($cuantos);
        $query->fetch();
        return $cuantos>0;

        
    }
    echo json_encode($result);
?>