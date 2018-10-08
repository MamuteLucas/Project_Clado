<?php
	require("php/validateLogin.php");

	if(empty($_GET["clado_id"])){
		header("location: home.php?pag=inicio");

	} else{
		require("php/connect.php");
		$con = new connect();
		$rowCount = $con->checkCladogram($_SESSION["user_id"], $_GET["clado_id"]);

		if($rowCount == 1){
			$dir_cladogram = $con->selectCladogram($_GET["clado_id"]);
			$title = $dir_cladogram["clado_name"];
			$dir_cladogram = $dir_cladogram["clado_directory"].".json";

		} else{
			$_SESSION["result"] = "Acesso negado";
			$_SESSION["alert_class"] = "alert-danger";
			header("location: home.php?pag=inicio");
		}
	}


?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="utf-8">
	<title><?= $title;?></title>

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

	<script src="js/events-options.js"></script>

	<link rel="stylesheet" type="text/css" href="css/style-app.css">

	<script type="text/javascript">
		startDiagram("<?= "cladogramas/".$dir_cladogram; ?>", "<?= $_SESSION["user_name"]; ?>");
	</script>

</head>

<body oncontextmenu="return false">
    <div id="tree-container"></div>

		<div id="div_tabOptions">
			<ul id="ul_options">
				<li class="li_search">
					<p id="title_tabOptions"></p>
				</li>

				<li class="li_search" id="li_addFilo">
					<span>Inserir novo filo</span>
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

		<div class="popup">
			<div id="createOrEdit_filo">
				<h2 id="createOrEdit_title"></h2>

				<form onsubmit="return false;" id="form_addOrEditFilo">
					<div id="input_filoName">
						<input type="text" name="filo_name" class="form_input" placeholder="Nome do filo">
				  	</div>

					<div id="input_filoButton">
						<input type="submit" id="createOrEdit_btn" class="form_input form_inputButton" value="Salvar">
						<p class='smallp' id="small_popup"></p>
					</div>
				</form>

				<div id="div_informationFilo">
					<p>Nome: </p>
					<p>Criado por: </p>
					<p>Editado por: </p>
					<p>Número de edições: </p>
					<p>Número de sub-filos diretos: </p>
					<p>Número de sub-filos indiretos: </p>
					<p>Filo antecedente: </p>
				</div>
			</div>

		</div>

		<div class="popup" id="popup_shadow"></div>

		<input type="button" class="btn btn-primary anime" id="saveDiagram" value="Salvar">
</body>
</html>
