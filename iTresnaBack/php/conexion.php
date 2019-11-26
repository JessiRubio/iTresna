<?php
	$conexion = new mysqli('localhost', 'root', '', 'bditresna');
	if(mysqli_connect_error())
	{
		die("error de conexión: ".mysqli_connect_error());
	}
?>