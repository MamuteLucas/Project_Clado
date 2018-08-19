<?php
  if(!empty($_POST["email"])){
    $email = $_POST["email"];
    $email = addslashes($email);

    require("connect.php");

    $con = new connect();
    $nLinhas = $con->checkEmail($email);

    if($nLinhas != 0){
      echo "Email já cadastrado";
    }
  }
?>
