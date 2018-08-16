<?php
	include("php/connect.php");

	$sql = "SELECT * FROM `cladograma` WHERE Clado_userAdmin = 1";

	$info_clado = mysqli_query($con, $sql) or die('Falha procurar cladograma');
	$info_clado = mysqli_fetch_array($info_clado);
	$dir_cladograma = $info_clado['Clado_userAdmin']."_".$info_clado['Clado_nome'].".json";
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="utf-8">
	<title>Página Principal</title>

	<script src="js/jquery-3.3.1.min.js"></script>
	<script src="js/d3.v3.min.js"></script>

	<script src="js/dndTree.js"></script>
	<link rel="stylesheet" type="text/css" href="css/dndTree.css">

	<script src="js/script-app.js"></script>
	<link rel="stylesheet" type="text/css" href="css/style-app.css">

	<script src="js/events-search.js"></script>
	<link rel="stylesheet" type="text/css" href="css/div_search.css">

	<script src="js/events-tabOptions.js"></script>
	<link rel="stylesheet" type="text/css" href="css/div_tabOptions.css">

	<script type="text/javascript">
		startDiagram("<?= "cladogramas/".$dir_cladograma ?>");
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
