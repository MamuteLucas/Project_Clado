<?php
	include("connect.php");

	$sql = "SELECT * FROM `cladograma` WHERE Clado_userAdmin = 1";

	$info_clado = mysqli_query($con, $sql) or die('Falha procurar cladograma');
	$info_clado = mysqli_fetch_array($info_clado);
	$dir_cladograma = "cladogramas/".$info_clado['Clado_userAdmin']."_".$info_clado['Clado_nome'].".json";
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="utf-8">

	<link rel="stylesheet" type="text/css" href="css/jquery.contextMenu.min.css">
	<link rel="stylesheet" type="text/css" href="css/dndTree.css">
	<link rel="stylesheet" type="text/css" href="css/style-app.css">

	<script src="js/jquery-3.3.1.min.js"></script>
	<script src="js/jquery.contextMenu.min.js"></script>
	<script src="js/jquery.ui.position.js"></script>
	<script src="js/d3.v3.min.js"></script>
	<script src="js/script-app.js"></script>
	<?php include('js/dndTree.php') ?>

</head>

<body onselectstart="return false" oncontextmenu="return false" ondragstart="return false" onMouseOver="window.status='..message perso .. '; return true;">
    <div id="tree-container"></div>

		<button type="button" class="btn btn-primary anime" onclick="saveDiagram()">Salvar</button>
</body>
</html>
