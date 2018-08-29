<?php
  $json = fopen("../".$_POST["cladogram"], "w");
  fwrite($json, $_POST["modifiedDiagram"]);
  fclose($json);
?>
