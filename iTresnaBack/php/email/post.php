<?php

require_once("./../conexion.php");
require_once("Mail.php");
$json = file_get_contents('php://input');
$data = json_decode($json);

$result=array("error"=>1);


$userEmail = $data->userEmail;

if($userEmail!=""){
    $sql="SELECT sarbidea
        FROM t_usuarios
        WHERE cod_usuario=?";
    $query=$conexion->prepare($sql);
    $query->bind_param("s",$userEmail);
    $query->execute();
    $query->bind_result($sarbidea);
    $query->fetch();
    $result["password"]=$sarbidea;

    if ($sarbidea!=""){
        $result["error"]=0;
        sendEmail($userEmail,$sarbidea);
    }else{
        echo json_encode($result);
    }
}

function sendEmail($userEmail,$sarbidea){
    include("./../conexion.php");
    $mensaje = "\n\n¡Hola! su antigua contraseña era: \n".$sarbidea." \n\nPodrá iniciar sesión con ella sin problema, pero recuerde cambiarla. \n\n Atentamente, la administración de iTresna";

    $contact = "";
    $content = "$mensaje";

    $host = "ssl://smtp.gmail.com";
    $username = "iTresna.TX@gmail.com";
    $password = "iTresna1234";
    $port = "465";
    $to = $userEmail;
    $email_from = "iTresna.TX@gmail.com";
    $email_subject = "Recuperación de contraseña";

    $email_body = '';
    $email_body .= $contact;
    $email_body .= $content;
    $email_body .= '';

    $email_address = $userEmail;

    $headers = "";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
    $headers .= "From:".$email_from."\n";
    $headers .= "Reply-To: no-reply";

    $headers = array ('From' => $email_from, 'To' => $to, 'Subject' => $email_subject, 'Reply-To' => $email_address);
    $smtp = Mail::factory('smtp', array ('host' => $host, 'port' => $port, 'auth' => true, 'username' => $username, 'password' => $password));
    $mail = $smtp->send($to, $headers, $email_body,$headers);

    $response_array = 'success';
    echo json_encode($response_array);
    header($response_array);
    return $email_from;
} 
?>

