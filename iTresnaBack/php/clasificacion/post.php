<?php
    include("./../conexion.php");
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    $accion = $data->accion;
    $cod_senal=$data->cod_senal;
    $cod_cop=$data->cod_cop;
    $cod_esp=$data->cod_esp;