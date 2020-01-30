<?php

    class ServicioAPI {

        function API(){
            
            header('Content-Type:application/JSON');
            $method=$_SERVER['REQUEST_METHOD'];
            switch($method){
                case 'GET':
                    include('get.php');
                    break;
                case 'POST':
                    include('post.php');
                case 'PUT':
                    include('put.php');
                    break;
                    break;
                case 'DELETE':
                    include('delete.php');
                    break;
                default:
                    echo "Método no soportado";
                    break;
            }
        }
    }

?>