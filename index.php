<?php
	session_start();

	if(!empty($_SESSION["user_id"])){
		header("location: home.php");
	}

	if(empty($_GET["pag"])){
		header("location: ?pag=entrar");
	} else if($_GET["pag"] != "entrar" && $_GET["pag"] != "cadastrar"){
		header("location: ?pag=entrar");
	}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="utf-8">
	<title>Página Inicial</title>

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
