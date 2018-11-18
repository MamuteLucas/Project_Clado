<?php
	session_start();

	if(empty($_SESSION["user_id"])) {
		echo "<script> location.replace('index.php'); </script>";
	}
?>
