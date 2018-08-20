<?php
  if(!empty($_POST["password"])){
    $password = $_POST["password"];
    $password = hash("sha512", $password);

    session_start();

    require("connect.php");

    $con = new connect();
    $nLinha = $con->checkPassword($_SESSION["user_id"], $password);

    if($nLinha != 1){
      echo "Senha incorreta";
    }
  }
?>
