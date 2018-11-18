<?php
	session_start();

	if(!empty($_SESSION["user_id"])){
		echo "<script> location.replace('home.php'); </script>";
	}

	if(empty($_GET["pag"])){
		echo "<script> location.replace('?pag=entrar'); </script>";
	} else if($_GET["pag"] != "entrar" && $_GET["pag"] != "cadastrar"){
		echo "<script> location.replace('?pag=entrar'); </script>";
	}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="utf-8">
	<title>Página Inicial</title>
	<link rel="icon" type="imagem/png" href="images/icon-cladograma.png" />

	<script src="js/jquery-3.3.1.min.js"></script>
	<link rel="stylesheet" type="text/css" href="css/style-app.css">

	<?php
		if($_GET["pag"] == "entrar"){
			echo '<script src="js/events-login.js"></script>';
	 	} else if($_GET["pag"] == "cadastrar"){
			 echo '<script src="js/events-register.js"></script>';
		}
	?>
</head>

<body>
  <?php
		if($_GET["pag"] == "entrar"){
			include("html/login.html");
		} else if($_GET["pag"] == "cadastrar"){
			include("html/register.html");
		}
	?>
</body>
</html>
