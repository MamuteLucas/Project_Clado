<?php
  $json = fopen('../cladogramas/1_cladograma.json', 'w');
  fwrite($json, $_POST['modifiedDiagram']);
  fclose($json);
?>
