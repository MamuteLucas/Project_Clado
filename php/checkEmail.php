<?php
  if(!empty($_POST["email"])){
    $email = $_POST["email"];
    $email = addslashes($email);

    require("connect.php");

    $con = new connect();
    $nLinhas = $con->checkEmail($email);

    if($nLinhas != 0){
      session_start();
      if(!empty($_SESSION["user_email"])){
        echo $_SESSION["user_email"];

      } else{
        echo "JA CADASTRADO";

      }
    }
  }
?>
