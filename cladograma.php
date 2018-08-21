<?php
	require("php/validateLogin.php");
	require("php/connect.php");

	if(empty($_GET["clado_id"])){
		header("location: home.php?pag=inicio");

	} else{
		$con = new connect();
		$rowCount = $con->checkCladogram($_SESSION["user_id"], $_GET["clado_id"]);

		if($rowCount == 1){
			$dir_cladogram = $con->selectCladogram($_GET["clado_id"]);
			$dir_cladogram = $dir_cladogram["clado_directory"].".json";

		} else{
			header("location: home.php?pag=inicio");
		}
	}


?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="utf-8">
	<title>Cladograma</title>

	<script src="js/jquery-3.3.1.min.js"></script>
	<script src="js/d3.v3.min.js"></script>

	<script src="js/dndTree.js"></script>
	<link rel="stylesheet" type="text/css" href="css/dndTree.css">

	<script src="js/cladograma.js"></script>
	<link rel="stylesheet" type="text/css" href="css/cladograma.css">

	<script src="js/events-search.js"></script>
	<link rel="stylesheet" type="text/css" href="css/div_search.css">

	<script src="js/events-tabOptions.js"></script>
	<link rel="stylesheet" type="text/css" href="css/div_tabOptions.css">

	<script type="text/javascript">
		startDiagram("<?= "cladogramas/".$dir_cladogram ?>");
	</script>

</head>

<body oncontextmenu="return false">
    <div id="tree-container"></div>

		<div id="div_tabOptions">
			<ul id="ul_options">
				<li class="li_search" id="li_addFilo">
					<label for="input_addFilo"><p id="p_addFilo">Inserir novo filo</p></label>
					<input type="text" id="input_addFilo">
				</li>

				<li class="li_search" id="li_removeFilo">
					<span>Remover filo</span>
				</li>

				<li class="li_search" id="li_editFilo">
					<span>Editar filo</span>
				</li>

				<li class="li_search" id="li_infoFilo">
					<span>Informações sobre o filo</span>
				</li>
			</ul>
		</div>

		<div id="div_search">
			<input type="text" class="btn" id="input_text" placeholder="Pesquise por um filo..." autocomplete="off">
			<ul id="ul_autoComplete"></ul>
			<input type="button" class="btn btn-primary" id="input_button" value="">
		</div>

		<input type="button" class="btn btn-primary anime" onclick="saveDiagram()" value="Salvar">
</body>
</html>
