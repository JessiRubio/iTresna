<?php

    include("./../conexion.php");
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    $accion=$data->accion;
    
    $result=array(
        "error"=>1,
    );

    if($accion=="nuevaOrganizacion"){
        $desc_org=$data->desc_org;
        $image=$data->imagen;
        $eslogan=$data->eslogan;
        $enlace=$data->enlace;
        if(isset($desc_cop) && $desc_cop!="" && $eslogan!=""){
            $cod_org=getCodOrg();
            $sql="INSERT INTO t_org(cod_org,desc_org,enlace_org,eslogan_org) values(?,?,?,?)";
            $query=$conexion->prepare($sql);
            $query->bind_param("isss",$cod_org,$desc_cop,$enlace,$eslogan);
            $query->execute();
            $affected_rows=$query->affected_rows;
            $result["error"]=($affected_rows>0)?0:1;
            if($affected_rows>0 && $image!=""){
                updateImagen($cod_org,$image);
            }
        }
    }
    else if($accion=="camposClasif"){
        $cod_org = $data->cod_org;
        $clasif1 = $data->clasif1;
        $clasif2 = $data->clasif2;
        $clasif3 = $data->clasif3;
        $sql="UPDATE t_org SET clasif1=?, clasif2=?, clasif3=? WHERE cod_org=?";
        $query=$conexion->prepare($sql);
        $query->bind_param("sssi", $clasif1, $clasif2, $clasif3,$cod_org);
        $query->execute();
        $affected_rows=$query->affected_rows;
        $result["error"]=($affected_rows>0)?0:1;
    }

    echo json_encode($result);
    function updateImagen($cod_org,$image){
        include("./../conexion.php");
        try{
            $file=base64_decode($image);
            $result["error"]=1;
            if(!file_exists('../media/'.$cod_org)){
                mkdir("../media/".$cod_org);
            }
            file_put_contents("../media/".$cod_org."/logo_".$cod_org.".png",$file);
            if(file_exists("../media/".$cod_org."/logo_".$cod_org.".png")){
                $pathToFile="http://localhost:8080/media/".$cod_org."/logo_".$cod_org.".png";
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
    function getCodOrg(){
        include("./../conexion.php");
        $sql="SELECT MAX(cod_org)
            FROM t_org";
        $query=$conexion->prepare($sql);
        $query->execute();
        $query->bind_result($cod_org);
        $query->fetch();
        $query->close();
        return ($cod_org!=null)?($cod_org+1):1;
    }
?>