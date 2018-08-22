<?php
  require("connect.php");

  $user_id = $_POST["user_id"];
  $user_id = addslashes($user_id);
  $clado_name = $_POST["clado_name"];
  $clado_name = addslashes($clado_name);

  $con = new connect();
  $clado_directory = $con->createNewCladogram($clado_name, $user_id);

  if($clado_directory != "CHAVE DUPLICADA"){
    $file = "../cladogramas/".$clado_directory.".json";
    $pattern = '{"name": "Vida"}';

    $newJson = fopen($file, "w");
    fwrite($newJson, $pattern);
    fclose($newJson);

    echo "Novo cladograma criado";
    
  } else{
    echo $clado_directory;

  }
?>
