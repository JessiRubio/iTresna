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
    include("./../conexion.php");
    $mensaje = "¡Hola! \n su antigua contraseña era: \n".$sarbidea.". \n 
            Podra iniciar sesión con ella sin problema, pero recuerde cambiarla. \n\n Atentamente, la administración de iTresna";

    $contact = "<p><strong>Email:</strong> $userEmail</p>";
    $content = "<p>$message</p>";

    $host = "ssl://smtp.gmail.com";
    $username = "iTresnaDevelopment@gmail.com";
    $password = "iTresnaabcd1234";
    $port = "465";
    $to = $userEmail;
    $email_from = "iTresnaDevelopment@gmail.com";
    $email_subject = "Línea de asunto aquí:";

    $email_body = '<html><body>';
    $email_body .= $contact;
    $email_body .= $content;
    $email_body .= '</body></html>';

    $email_address = $userEmail;

    $headers = "";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
    $headers .= "From:".$email_from."\n";
    $headers .= "Reply-To: no-reply";

    $headers = array ('From' => $email_from, 'To' => $to, 'Subject' => $email_subject, 'Reply-To' => $email_address);
    $smtp = Mail::factory('smtp', array ('host' => $host, 'port' => $port, 'auth' => true, 'username' => $username, 'password' => $password));
    $mail = $smtp->send($to, $headers, $email_body,$headers);


    $response_array['status'] = 'success';
    $response_array['from'] = $from_email;
    echo json_encode($response_array);
    echo json_encode($from_email);
    header($response_array);
    return $from_email;
} 
?>

