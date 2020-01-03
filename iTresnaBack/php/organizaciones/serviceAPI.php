
<?php

class ServicioAPI {

    function API(){
        
        header('Content-Type:application/JSON');
        $method=$_SERVER['REQUEST_METHOD'];
        switch($method){
            case 'POST':
                include('post.php');
                break;
                case 'GET':
                    include('get.php');
                    break;   
            case 'PUT':
                include('put.php');
                break;
            default:
                echo "Método no soportado";
                break;
        }
    }
}

?>