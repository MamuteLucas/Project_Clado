<?php
  $json = fopen('../cladogramas/1_cladograma.json', 'r');
  echo fread($json, filesize('../cladogramas/1_cladograma.json'));
  fclose($json);
?>
