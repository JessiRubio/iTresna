<?php
	$conexion = new mysqli('localhost', 'root', '', 'itresna_itresna');
	
	if(mysqli_connect_error())
	{
		die("error de conexión: ".mysqli_connect_error());
	}
	if(!$conexion->set_charset("utf8")){
		die("No se ha podido establecer el charset\n".$conexion->error);
	}
?>
