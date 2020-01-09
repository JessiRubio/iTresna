<?php
    require_once("./../conexion.php");
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $image = $data->image;
    $cod_cop = $data->cod_cop;
    $cod_esp = $data->cod_esp;
    $cod_org = $data->cod_org;
    $file=base64_decode($image);
    $result["error"]=1;
    file_put_contents("../media/".$cod_org.$cod_esp.$cod_cop."/logo.png",$file);
    /*
    if(mkdir("../media/".$cod_org.$cod_esp.$cod_cop)){
    
        if(move_uploaded_file($file,"../media/".$cod_org.$cod_esp.$cod_cop."/".$image)){
            $result["error"]=0;
        }else{
            
        }
        echo json_encode($result);
    }
    */
?>