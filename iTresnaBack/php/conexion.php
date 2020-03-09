<?php
	$conexion = new mysqli('localhost', 'itresna_itresna', 'Abcd_1234', 'itresna_itresna');
	if(mysqli_connect_error())
	{
		die("error de conexión: ".mysqli_connect_error());
	}
?>