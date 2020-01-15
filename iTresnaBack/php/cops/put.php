<?php
    require_once("./../conexion.php");
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $result=array();
    $result["error"]=1;
    try{
        $cod_cop = $data->cod_cop;
        $cod_esp = $data->cod_esp;
        $cod_org = $data->cod_org;
        if($cod_cop!="" && $cod_esp!="" && $cod_org!=""){
            $desc_cop = $data->desc_cop;
            $image = $data->image;
            if($image!=""){
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
                        SET desc_cop=?, img_cop=?
                        WHERE cod_cop=? AND cod_esp=? AND cod_org=?";
                    $query=$conexion->prepare($sql);
                    $query->bind_param("ssiii",$desc_cop,$pathToFile,$cod_cop,$cod_esp,$cod_org);
                    $query->execute();
                    $result["error"]=0;
                }else{
                    $result["error"]="No se ha podido crear el archivo";
                }
            }else{
                $sql="UPDATE t_cops
                        SET desc_cop=?
                        WHERE cod_cop=? AND cod_esp=? AND cod_org=?";
                $query=$conexion->prepare($sql);
                $query->bind_param("siii",$desc_cop,$cod_cop,$cod_esp,$cod_org);
                $query->execute();
                $result["error"]=0;
            }
           
        }
        echo json_encode($result);
    }catch(Exception $e){
        $result["error"]=$e->getMessage();
        echo json_encode($result);
    }
    
    

?>