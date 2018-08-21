<?php
	session_start();

	if(!empty($_SESSION["user_id"])){
		header("location: home.php");
	}

	if(empty($_GET["pag"])){
		 header("location: ?pag=inicio");
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
	<div id="navbar">
		<ul id="ul_navbar">
			<?php
				$active['inicio'] = '';
			  $active['cadastrar'] = '';
			  $active['entrar'] = '';

			  $active[$_GET['pag']] = "active";
			?>

			<li class="li_navbar"><a class="a_navbar <?= $active["inicio"] ?>" href="?pag=inicio">Início</a></li>
			<li class="li_navbar li_right"><a class="a_navbar <?= $active["cadastrar"] ?>" href="?pag=cadastrar">Criar conta</a></li>
			<li class="li_navbar li_right"><a class="a_navbar <?= $active["entrar"] ?>" href="?pag=entrar">Entrar</a></li>
		</ul>
	</div>

  <?php
		if($_GET["pag"] == "entrar"){
			include("html/login.html");
		} else if($_GET["pag"] == "cadastrar"){
			include("html/register.html");
		}
	?>
</body>
</html>
