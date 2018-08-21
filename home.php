<?php
	require("php/validateLogin.php");

	if(empty($_GET["pag"])){
		 header("location: ?pag=inicio");
	}

	require("php/connect.php");

	$con = new connect();
	$_SESSION["cladograms"] = $con->searchCladograms($_SESSION["user_id"]);
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="utf-8">
	<title>Página Principal</title>

	<script src="js/jquery-3.3.1.min.js"></script>
	<link rel="stylesheet" type="text/css" href="css/style-app.css">

	<?php
		if($_GET["pag"] == "inicio"){
			echo "<link rel='stylesheet' type='text/css' href='css/home.css'>";
			echo "<script src='js/events-showCladograms.js'></script>";
		} else if($_GET["pag"] == "conta"){
			echo "<script src='js/events-configAccount.js'></script>";
		}
	?>
</head>

<body>
	<div id="navbar">
		<ul id="ul_navbar">
			<?php
				$active["inicio"] = "";
			  $active["conta"] = "";
				$active["sair"] = "";

			  $active[$_GET["pag"]] = "active";
			?>

			<li class="li_navbar"><a class="a_navbar <?= $active["inicio"] ?>" href="?pag=inicio">Início</a></li>
			<li class="li_navbar li_right"><a class="a_navbar <?= $active["sair"] ?>" href="?pag=sair">Sair</a></li>
			<li class="li_navbar li_right"><a class="a_navbar <?= $active["conta"] ?>" href="?pag=conta">Conta</a></li>
		</ul>
	</div>

	<?php
		if($_GET["pag"] == "inicio"){
			include("php/showCladograms.php");
		} else if($_GET["pag"] == "conta"){
			include("php/configAccount.php");
		} else if($_GET["pag"] == "sair"){
			include("php/doLogout.php");
		}
	?>

</body>
</html>
