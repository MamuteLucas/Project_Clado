<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="utf-8">
	<title>Página Principal</title>

	<script src="js/jquery-3.3.1.min.js"></script>
	<link rel="stylesheet" type="text/css" href="css/index.css">

	<?php
		if(!empty($_GET["pag"])){
			if($_GET["pag"] == "entrar"){
				echo '<script src="js/events-login.js"></script>';
		 } else if($_GET["pag"] == "cadastrar"){
			 echo '<script src="js/events-register.js"></script>';
		 }
	 }
	?>
</head>

<body>
	<div id="navbar">
		<ul>
			<?php
				if(!empty($_GET["pag"])){
					if($_GET["pag"] == "inicio"){
						echo '<li><a class="active" href="?pag=inicio">Início</a></li>';
		 		  	echo '<li class="li_right"><a href="?pag=cadastrar">Criar conta</a></li>';
						echo '<li class="li_right"><a href="?pag=entrar">Entrar</a></li>';
				 } else if($_GET["pag"] == "entrar"){
					 echo '<li><a href="?pag=inicio">Início</a></li>';
					 echo '<li class="li_right"><a href="?pag=cadastrar">Criar conta</a></li>';
					 echo '<li class="li_right"><a class="active" href="?pag=entrar">Entrar</a></li>';
				 } else if($_GET["pag"] == "cadastrar"){
					 echo '<li><a href="?pag=inicio">Início</a></li>';
					 echo '<li class="li_right"><a class="active" href="?pag=cadastrar">Criar conta</a></li>';
					 echo '<li class="li_right"><a href="?pag=entrar">Entrar</a></li>';
				 }
			 }
			?>
		</ul>
	</div>

  <?php
	 	if(!empty($_GET["pag"])){
			if($_GET["pag"] == "entrar"){
				include("php/login.php");
			} else if($_GET["pag"] == "cadastrar"){
				include("php/register.php");
			}

		} else{
			header("location: ?pag=inicio");
		}
	?>
</body>
</html>
