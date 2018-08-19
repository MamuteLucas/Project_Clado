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
	<link rel="stylesheet" type="text/css" href="css/index.css">

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
		<ul>
			<?php
				$active['inicio'] = '';
			  $active['cadastrar'] = '';
			  $active['entrar'] = '';

			  $active[$_GET['pag']] = 'class="active"';
			?>

			<li><a <?= $active['inicio'] ?> href="?pag=inicio">Início</a></li>
			<li class="li_right"><a <?= $active['cadastrar'] ?> href="?pag=cadastrar">Criar conta</a></li>
			<li class="li_right"><a <?= $active['entrar'] ?> href="?pag=entrar">Entrar</a></li>
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
