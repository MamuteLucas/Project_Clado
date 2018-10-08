<?php
  require("connect.php");

  session_start();
  $user_id = $_SESSION["user_id"];
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
    
    $_SESSION["result"] = "Novo cladograma criado";

  } else{
    echo $clado_directory;

  }
?>
