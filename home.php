<?php
	require("php/validateLogin.php");

	if(empty($_GET["pag"])){
		 header("location: ?pag=inicio");
	}

	require("php/connect.php");


	$con = new connect();
	$cladograms = $con->searchCladograms($_SESSION["user_id"]);
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="utf-8">
	<title>Página Principal</title>

	<script src="js/jquery-3.3.1.min.js"></script>
	<link rel="stylesheet" type="text/css" href="css/home.css">
</head>

<body>
	<div id="navbar">
		<ul>
			<?php
				$active["inicio"] = "";
			  $active["conta"] = "";
				$active["sair"] = "";

			  $active[$_GET["pag"]] = "class='active'";
			?>

			<li><a <?= $active["inicio"] ?> href="?pag=inicio">Início</a></li>
			<li class="li_right"><a <?= $active["sair"] ?> href="?pag=sair">Sair</a></li>
			<li class="li_right"><a <?= $active["conta"] ?> href="?pag=conta">Conta</a></li>
		</ul>
	</div>

	<?php
		if($_GET["pag"] == "conta"){
			include("php/configAccount.php");
		} else if($_GET["pag"] == "sair"){
			include("php/doLogout.php");
		}
	?>

</body>
</html>
