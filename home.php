<?php
	require("php/validateLogin.php");

	if(empty($_GET["pag"])){
		 header("location: ?pag=inicio");

	} else{
		if($_GET["pag"] != "inicio" && $_GET["pag"] != "conta" && $_GET["pag"] != "solicitacao" && $_GET["pag"] != "sair" && $_GET["pag"] != "criar"){
			header("location: ?pag=inicio");
		}
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

			if(!empty($_SESSION["result"])){
				echo "<link rel='stylesheet' type='text/css' href='css/alertCladogram.css'>";
				echo "<script src='js/events-alertCladogram.js'></script>";

				echo "<script src='js/bootstrap.min.js'></script>";

			}

		} else if($_GET["pag"] == "conta"){
			echo "<script src='js/events-configAccount.js'></script>";

		} else if($_GET["pag"] == "criar"){
			echo "<script src='js/events-createCladogram.js'></script>";

		} else if($_GET["pag"] == "solicitacao"){
			echo "<link rel='stylesheet' type='text/css' href='css/solicitation.css'>";
			echo "<script src='js/events-solicitation.js'></script>";

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
				$active["solicitacao"] = "";

			  $active[$_GET["pag"]] = "active";
			?>

			<li class="li_navbar"><a class="a_navbar <?= $active["inicio"] ?>" href="?pag=inicio">Início</a></li>
			<li class="li_navbar li_right"><a class="a_navbar <?= $active["sair"] ?>" href="?pag=sair">Sair</a></li>
			<li class="li_navbar li_right"><a class="a_navbar <?= $active["conta"] ?>" href="?pag=conta">Conta</a></li>
			<li class="li_navbar li_right"><a class="a_navbar <?= $active["solicitacao"] ?>" href="?pag=solicitacao">Solicitações</a></li>
		</ul>
	</div>

	<?php
		if($_GET["pag"] == "inicio"){
			include("php/showCladograms.php");

			if(!empty($_SESSION["result"])){
				if($_SESSION["result"] == "Cladograma não existe"){
					$alert_class = "alert-danger";
			
				} else if($_SESSION["result"] == "Cladograma já adicionado" || 
							$_SESSION["result"] == "Solicitação já foi enviada"){
					$alert_class = "alert-warning";
			
				} else if($_SESSION["result"] == "Solicitação enviada com sucesso" || 
							$_SESSION["result"] == "Solicitação re-enviada com sucesso" ||
							$_SESSION["result"] == "Novo cladograma criado"){
					$alert_class = "alert-success";
			
				}

				echo "<div id='alert_cladogram' class='alert $alert_class fade show' role='alert'>".$_SESSION["result"]."</div>";
				
				unset($_SESSION["result"]);
			}

		} else if($_GET["pag"] == "conta"){
			include("php/configAccount.php");

		} else if($_GET["pag"] == "sair"){
			include("php/doLogout.php");

		} else if($_GET["pag"] == "criar"){
			if(!empty($_GET["token"])){
				include("php/addCladogramByToken.php");
			} else{
				include("html/formNewCladogram.html");
			}

		} else if($_GET["pag"] == "solicitacao"){
			include("php/showSolicitation.php");

		}
	?>

</body>
</html>
