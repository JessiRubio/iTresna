<?php

require_once("./../conexion.php");
$json = file_get_contents('php://input');
$data = json_decode($json);

$result=array("error"=>1);


$userEmail = $data->userEmail;

if($userEmail!=""){
    $sql="SELECT sarbide
        FROM t_usuarios
        WHERE cod_usuario=?";
    $query=$conexion->prepare($sql);
    $query->bind_param("s",$userEmail);
    $query->execute();
    $query->bind_result($sarbidea);
    $query->fetch();
    $result["password"]=$sarbidea;

    if ($sarbide!=""){
        $result["error"]=0;
        sendEmail($userEmail,$sarbidea);
    }else{
        echo json_encode($result);
    }
}

function sendEmail($userEmail,$sarbidea){
    $mensaje = "¡Hola! \n su antigua contraseña era: \n" . $sarbidea . ". \n 
            Podra iniciar sesión con ella sin problema, pero recuerde cambiarla. \n\n Atentamente, la administración de iTresna";

    $mensaje = "¡Hola! \n su antigua contraseña era: \n" + $sarbidea + ". \n 
        Podra iniciar sesión con ella sin problema, pero recuerde cambiarla. \n\n Atentamente, la administración de iTresna";

    $contact = "<p><strong>Email:</strong> $userEmail</p>";
    $content = "<p>".$mensaje."</p>";

    $contact = "<p><strong>Email:</strong> $userEmail</p>";
    $content = "<p>$message</p>";

    $email_body = '<html><body>';
    $email_body .= $contact;
    $email_body .= $content;
    $email_body .= '</body></html>';
    
    $headers = "";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
    $headers .= "From:".$from_email."\n";
    $headers .= "Reply-To:".$userEmail;

    mail($userEmail,$email_subject,$email_body,$headers);

    $response_array['status'] = 'success';
    $response_array['from'] = $from_email;
    echo json_encode($response_array);
    echo json_encode($from_email);
    header($response_array);
    return $from_email;
} 
?>

